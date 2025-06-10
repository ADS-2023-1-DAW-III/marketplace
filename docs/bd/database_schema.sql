CREATE TABLE Pessoa (
    username VARCHAR(100) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL,
    id_abacate VARCHAR(32) NOT NULL,
    contato VARCHAR(15) NOT NULL,
    senha VARCHAR(20) NOT NULL,
    habilidades VARCHAR(100) NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE Categoria (
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    PRIMARY KEY (nome)
);

CREATE TABLE Servico (
    id INT AUTO_INCREMENT NOT NULL,
    id_imagem INT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    eh_negociavel BOOLEAN NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL NOT NULL,
    duracao INT NOT NULL,
    status BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Negociacao (
    id INT AUTO_INCREMENT NOT NULL,
    houve_negociacao BOOLEAN NOT NULL,
    aceito BOOLEAN NOT NULL,
    novo_valor INT NOT NULL,
    id_pessoa VARCHAR(100) NOT NULL,
    id_servico INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_pessoa) REFERENCES Pessoa(username),
    FOREIGN KEY (id_servico) REFERENCES Servico(id)
);

CREATE TABLE Historico (
    id INT AUTO_INCREMENT NOT NULL,
    data DATETIME NOT NULL,
    id_pessoa VARCHAR(100) NOT NULL,
    id_servico INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_pessoa) REFERENCES Pessoa(username),
    FOREIGN KEY (id_servico) REFERENCES Servico(id)
);

CREATE TABLE Servico_Categoria (
    id INT AUTO_INCREMENT NOT NULL,
    id_servico INT NOT NULL,
    id_categoria VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_servico) REFERENCES Servico(id),
    FOREIGN KEY (id_categoria) REFERENCES Categoria(nome)
);

CREATE TABLE Avaliacao (
    id INT AUTO_INCREMENT NOT NULL,
    comenterio TEXT NOT NULL,
    estrelas INT NOT NULL CHECK (estrelas BETWEEN 1 AND 5),
    id_pessoa VARCHAR(100) NOT NULL,
    id_servico INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_pessoa) REFERENCES Pessoa(username),
    FOREIGN KEY (id_servico) REFERENCES Servico(id)
);

CREATE TABLE Pagamento (
    id_abacate INT AUTO_INCREMENT NOT NULL,
    data DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    valor INT NOT NULL,
    id_negociacao INT NOT NULL,
    PRIMARY KEY (id_abacate),
    FOREIGN KEY (id_negociacao) REFERENCES Negociacao(id)
);