import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface CustomerMetadata {
  name: string;
  cellphone: string;
  email: string;
  taxId: string;
}

interface CustomerResponse {
  data: {
    id: string;
    metadata: CustomerMetadata;
  };
  error: any;
}

interface BillingProduct {
  id: string;
  externalId: string;
  quantity: number;
}

interface BillingCustomerMetadata {
  name: string;
  cellphone: string;
  email: string;
  taxId: string;
}

interface BillingCustomer {
  id: string;
  metadata: BillingCustomerMetadata;
}

interface BillingResponse {
  data: BillingData;
  error: any;
}

export interface BillingData {
  id: string;
  url: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  devMode: boolean;
  methods: string[];
  products: BillingProduct[];
  frequency: 'ONE_TIME' | 'RECURRING';
  nextBilling: string | null;
  customer: BillingCustomer;
}

interface BillingProductInput {
  externalId: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

interface CreateBillingParams {
  frequency: 'ONE_TIME' | 'RECURRING';
  methods: string[];
  products: BillingProductInput[];
  returnUrl: string;
  completionUrl: string;
  customerId?: string;
}

@Injectable()
export class AbacateService {
  private isValidCpfFormat(cpf: string): boolean {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
  }

  private isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhoneFormat(phone: string): boolean {
    const phoneRegex = /^\(\d{2}\) \d{4}-\d{4}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Cria um cliente na API AbacatePay.
   * Realiza validações de formato antes da requisição.
   * @param name - Nome completo do cliente.
   * @param cellphone - Número de telefone no formato (XX) XXXX-XXXX.
   * @param email - Email válido.
   * @param taxId - CPF no formato XXX.XXX.XXX-XX.
   * @throws Erro caso algum dos formatos esteja inválido.
   */
  public async createCustomer(
    name: string,
    cellphone: string,
    email: string,
    taxId: string,
  ): Promise<void> {
    if (!this.isValidCpfFormat(taxId)) {
      throw new Error('CPF inválido. Deve conter 11 dígitos numéricos.');
    }

    if (!this.isValidEmailFormat(email)) {
      throw new Error('Email inválido.');
    }

    if (!this.isValidPhoneFormat(cellphone)) {
      throw new Error(
        'Telefone inválido. Deve seguir o formato (11) 4002-8922.',
      );
    }

    try {
      const response = await axios.post<CustomerResponse>(
        'https://api.abacatepay.com/v1/customer/create',
        {
          name: name,
          cellphone: cellphone,
          email: email,
          taxId: taxId,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.ABACATE_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(response.data);
    } catch (error) {
      console.error('Erro ao criar customer:', error);
    }
  }

  public async createBilling(
    params: CreateBillingParams,
  ): Promise<BillingData | undefined> {
    const payload: any = {
      frequency: params.frequency,
      methods: params.methods,
      products: params.products,
      returnUrl: params.returnUrl,
      completionUrl: params.completionUrl,
      customerId: params.customerId,
    };

    try {
      const response = await axios.post<BillingResponse>(
        'https://api.abacatepay.com/v1/billing/create',
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.ABACATE_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const billingData = response.data.data;
      console.log('Billing criado com sucesso:', billingData);
      return billingData;
    } catch (error) {
      console.error('Erro ao criar billing:', error);
    }
  }
}
