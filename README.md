# API para Uploads
API NestJS para upload e gerenciamento simples de arquivos com validação de tamanho e tipos de imagem.

## Pré-requisitos

- Git instalado
- Node.js 18 ou superior
- npm 9 ou superior

> Opcional: `@nestjs/cli` pode ser instalado globalmente, mas não é obrigatório para rodar o projeto.

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/zenakio/upload-1.git
```

2. Entre na pasta da aplicação:

```bash
cd /upload/
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie a aplicação em modo de desenvolvimento:

```bash
npm run start:dev
```

5. Acesse a API:

```text
http://localhost:3000
```

## Estrutura de pastas relevante

- `upload/src/arquivo/arquivo.controller.ts` - define os endpoints de upload, listagem e remoção.
- `upload/src/arquivo/arquivo.service.ts` - lógica de criação, listagem e exclusão de arquivos.
- `upload/drive` - pasta onde os arquivos enviados são armazenados.

## Guia Completo de Endpoints

### 1. Envio de arquivo

- Método: `POST`
- Rota: `/arquivo/upload`
- Tipo de requisição: `multipart/form-data`
- Parâmetros:
  - `file` (campo `form-data`) - arquivo a ser enviado.

#### Regras de upload

- Permite apenas imagens:
  - `.jpg` / `.jpeg`
  - `.png`
  - `.tif` / `.tiff`
- Tamanho máximo: 5MB

#### Exemplo de cURL

```bash
curl -X POST http://localhost:3000/arquivo/upload \
  -F "file=@/caminho/para/imagem.jpg"
```

#### Resposta de sucesso

```json
{
  "message": "Arquivo enviado com sucesso!",
  "filename": "file-168xxx123.jpg",
  "originalname": "imagem.jpg",
  "size": 102400
}
```

#### Erro de formato inválido

- Status: `400 Bad Request`

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Formato de arquivo não permitido. Somente JPG, PNG e TIFF são aceitos."
}
```

#### Erro de tamanho excedido

- Status: `413 Payload Too Large`

```json
{
  "statusCode": 413,
  "error": "Payload Too Large",
  "message": "Arquivo excede o limite de 5MB."
}
```

### 2. Listar arquivos

- Método: `GET`
- Rota: `/arquivo`
- Parâmetros: nenhum

#### Exemplo de resposta de sucesso

```json
{
  "total": 2,
  "files": [
    {
      "filename": "file-168xxx123.jpg",
      "size": 102400,
      "criado": "2026-05-20T12:34:56.000Z"
    },
    {
      "filename": "file-168xxx456.png",
      "size": 51200,
      "criado": "2026-05-20T12:35:30.000Z"
    }
  ]
}
```

#### Possível resposta de erro

- Status: `400 Bad Request`

```json
{
  "statusCode": 400,
  "message": "Não foi possivel listar os arquivos."
}
```

### 3. Remover arquivo por nome

- Método: `DELETE`
- Rota: `/arquivo/nome/:filename`
- Parâmetros:
  - `filename` (URL) - nome exato do arquivo armazenado em `upload/drive`

#### Exemplo de cURL

```bash
curl -X DELETE http://localhost:3000/arquivo/nome/file-168xxx123.jpg
```

#### Resposta de sucesso

```json
{
  "message": "Arquivo removido com sucesso.",
  "filename": "file-168xxx123.jpg"
}
```

#### Erro de arquivo não encontrado

- Status: `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Arquivo não encontrado."
}
```

### 4. Endpoints por ID (não implementados)

As rotas geradas pelo resource do NestJS para `GET /arquivo/:id`, `PATCH /arquivo/:id` e `DELETE /arquivo/:id` são atualmente placeholders e não fazem parte do fluxo de upload/removal real deste projeto.

- `GET /arquivo/:id` - placeholder gerado automaticamente
- `PATCH /arquivo/:id` - placeholder gerado automaticamente
- `DELETE /arquivo/:id` - placeholder gerado automaticamente

> Nota: a remoção efetiva de arquivo implementada neste projeto é feita apenas por nome, via `DELETE /arquivo/nome/:filename`.

## Observações

- Os uploads são salvos na pasta `upload/drive`.
- O endpoint de exclusão por nome é a forma recomendada de remover arquivos armazenados.
- Os endpoints de `GET /arquivo/:id`, `PATCH /arquivo/:id` e `DELETE /arquivo/:id` ainda são placeholders e retornam respostas de exemplo.
