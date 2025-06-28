import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCpfFormatConstraint implements ValidatorConstraintInterface {
  /**
   * Método que contém a lógica de validação do formato do CPF.
   * @param cpfValue O valor do CPF a ser validado.
   * @returns Retorna true se o formato for válido, false caso contrário.
   */
  validate(cpfValue: string) {
    if (!cpfValue) {
      return false; // Retorna falso para valores nulos ou vazios
    }

    // Regex para validar o formato do CPF:
    // Aceita 11 dígitos, com ou sem pontos e traço.
    // Ex: 12345678900, 123.456.789-00, 123.456.78900, 123456789-00
    const cpfFormatRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;

    return cpfFormatRegex.test(cpfValue);
  }

  /**
   * Define a mensagem de erro padrão caso a validação de formato falhe.
   * @returns A mensagem de erro.
   */
  defaultMessage() {
    return 'O formato do CPF está inválido. Use 11 dígitos (ex: 12345678900 ou 123.456.789-00).';
  }
}

/**
 * Decorador personalizado para validar apenas o formato do CPF.
 * Não valida a autenticidade do número via algoritmo.
 * @param validationOptions Opções de validação opcionais do class-validator.
 * @returns Um decorador de propriedade.
 */
export function IsCpfFormat(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfFormatConstraint,
    });
  };
}
