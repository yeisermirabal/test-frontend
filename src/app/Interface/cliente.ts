

export interface Cliente {
    id: number;
    nome: string;
    cep: string;
    cidade: string;
    grupo: {
        id: number,
        nome: string,
    };
}
