# API de Arquivos de Propriedades - Documentação Frontend

## Visão Geral

Sistema para gerenciar arquivos associados a propriedades (imóveis). Permite upload, listagem, atualização e exclusão de arquivos como PDFs, documentos, plantas, certificados energéticos, etc.

### Características
- **Tipos de arquivo suportados**: Todos (PDF, DOC, DOCX, XLS, XLSX, imagens, etc.)
- **Tamanho máximo**: 200 MB por arquivo
- **Storage**: Arquivos salvos em disco local
- **Limite de upload múltiplo**: Até 20 arquivos simultâneos
- **Campos personalizados**: Título opcional e flag de visibilidade
- **Cascade delete**: Deletar propriedade remove automaticamente todos os arquivos associados

---

## Estrutura de Dados

### PropertyFile Schema

```typescript
{
  id: string;              // UUID do arquivo
  propertyId: string;      // UUID da propriedade associada
  title: string | null;    // Título do arquivo (opcional, max 200 chars)
  isVisible: boolean;      // Se o arquivo deve ser exibido (default: true)
  filename: string;        // Nome do arquivo no servidor (UUID + extensão)
  originalName: string;    // Nome original do arquivo enviado
  mimeType: string;        // Tipo MIME (ex: "application/pdf")
  fileSize: number;        // Tamanho em bytes
  filePath: string;        // URL completa para acessar o arquivo
  createdAt: string;       // Data de criação (ISO 8601)
  updatedAt: string;       // Data de última atualização (ISO 8601)
}
```

### Exemplo de Resposta

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "propertyId": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Certificado Energético",
  "isVisible": true,
  "filename": "a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf",
  "originalName": "certificado_energetico.pdf",
  "mimeType": "application/pdf",
  "fileSize": 2458624,
  "filePath": "http://localhost:3008/uploads/files/a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf",
  "createdAt": "2025-12-22T10:30:00.000Z",
  "updatedAt": "2025-12-22T10:30:00.000Z"
}
```

---

## Endpoints

### 1. Listar Arquivos de uma Propriedade

**GET** `/properties/:id/files`

Retorna todos os arquivos associados a uma propriedade, ordenados por data de criação (mais recentes primeiro).

#### Parâmetros de URL
- `id` (string, obrigatório): UUID da propriedade

#### Resposta de Sucesso (200)

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "propertyId": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Certificado Energético",
    "isVisible": true,
    "filename": "abc123.pdf",
    "originalName": "certificado.pdf",
    "mimeType": "application/pdf",
    "fileSize": 2458624,
    "filePath": "http://localhost:3008/uploads/files/abc123.pdf",
    "createdAt": "2025-12-22T10:30:00.000Z",
    "updatedAt": "2025-12-22T10:30:00.000Z"
  },
  {
    "id": "660f9511-f3ac-52e5-b827-557766551111",
    "propertyId": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Planta do Imóvel",
    "isVisible": true,
    "filename": "def456.jpg",
    "originalName": "planta.jpg",
    "mimeType": "image/jpeg",
    "fileSize": 1234567,
    "filePath": "http://localhost:3008/uploads/files/def456.jpg",
    "createdAt": "2025-12-22T09:15:00.000Z",
    "updatedAt": "2025-12-22T09:15:00.000Z"
  }
]
```

#### Exemplo (JavaScript/Fetch)

```javascript
async function getPropertyFiles(propertyId) {
  const response = await fetch(`http://localhost:3008/properties/${propertyId}/files`);

  if (!response.ok) {
    throw new Error('Erro ao buscar arquivos da propriedade');
  }

  const files = await response.json();
  return files;
}
```

---

### 2. Upload de Arquivo Único

**POST** `/properties/:id/files`

Faz upload de um arquivo e associa à propriedade.

#### Parâmetros de URL
- `id` (string, obrigatório): UUID da propriedade

#### Body (multipart/form-data)
- `file` (File, obrigatório): Arquivo a ser enviado
- `title` (string, opcional): Título do arquivo (max 200 caracteres)
- `isVisible` (boolean, opcional): Se o arquivo deve ser visível (default: true)

#### Resposta de Sucesso (201)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "propertyId": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Certificado Energético",
  "isVisible": true,
  "filename": "abc123.pdf",
  "originalName": "certificado.pdf",
  "mimeType": "application/pdf",
  "fileSize": 2458624,
  "filePath": "http://localhost:3008/uploads/files/abc123.pdf",
  "createdAt": "2025-12-22T10:30:00.000Z",
  "updatedAt": "2025-12-22T10:30:00.000Z"
}
```

#### Erros Possíveis
- **400 Bad Request**: "Nenhum arquivo foi enviado"
- **404 Not Found**: "Propriedade com ID {id} não encontrada"
- **400 Bad Request**: Validação falhou (título muito longo, etc.)

#### Exemplo (JavaScript/Fetch)

```javascript
async function uploadPropertyFile(propertyId, file, title = null, isVisible = true) {
  const formData = new FormData();
  formData.append('file', file);

  if (title) {
    formData.append('title', title);
  }

  formData.append('isVisible', isVisible.toString());

  const response = await fetch(`http://localhost:3008/properties/${propertyId}/files`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao fazer upload do arquivo');
  }

  const uploadedFile = await response.json();
  return uploadedFile;
}
```

#### Exemplo (React Component)

```jsx
function FileUploadForm({ propertyId }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Selecione um arquivo');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title || file.name);
      formData.append('isVisible', isVisible.toString());

      const response = await fetch(`/api/properties/${propertyId}/files`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload falhou');

      const result = await response.json();
      alert('Arquivo enviado com sucesso!');

      // Resetar formulário
      setFile(null);
      setTitle('');
    } catch (error) {
      alert('Erro ao enviar arquivo: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        disabled={uploading}
      />

      <input
        type="text"
        placeholder="Título (opcional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={200}
        disabled={uploading}
      />

      <label>
        <input
          type="checkbox"
          checked={isVisible}
          onChange={(e) => setIsVisible(e.target.checked)}
          disabled={uploading}
        />
        Arquivo visível
      </label>

      <button type="submit" disabled={uploading}>
        {uploading ? 'Enviando...' : 'Upload'}
      </button>
    </form>
  );
}
```

---

### 3. Upload de Múltiplos Arquivos

**POST** `/properties/:id/files/multiple`

Faz upload de vários arquivos de uma vez (até 20 arquivos).

#### Parâmetros de URL
- `id` (string, obrigatório): UUID da propriedade

#### Body (multipart/form-data)
- `files` (File[], obrigatório): Array de arquivos (máximo 20)
- `title` (string, opcional): Título padrão para todos os arquivos
- `isVisible` (string, opcional): "true" ou "false" (default: "true")

#### Resposta de Sucesso (201)

```json
{
  "message": "3 arquivo(s) enviado(s) com sucesso",
  "files": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "propertyId": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Documentos",
      "isVisible": true,
      "filename": "abc123.pdf",
      "originalName": "doc1.pdf",
      "mimeType": "application/pdf",
      "fileSize": 1234567,
      "filePath": "http://localhost:3008/uploads/files/abc123.pdf",
      "createdAt": "2025-12-22T10:30:00.000Z",
      "updatedAt": "2025-12-22T10:30:00.000Z"
    },
    {
      "id": "660f9511-f3ac-52e5-b827-557766551111",
      "propertyId": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Documentos",
      "isVisible": true,
      "filename": "def456.pdf",
      "originalName": "doc2.pdf",
      "mimeType": "application/pdf",
      "fileSize": 2345678,
      "filePath": "http://localhost:3008/uploads/files/def456.pdf",
      "createdAt": "2025-12-22T10:30:01.000Z",
      "updatedAt": "2025-12-22T10:30:01.000Z"
    }
  ]
}
```

#### Erros Possíveis
- **400 Bad Request**: "Nenhum arquivo foi enviado"
- **404 Not Found**: "Propriedade com ID {id} não encontrada"
- **413 Payload Too Large**: Arquivo maior que 200MB

#### Exemplo (JavaScript/Fetch)

```javascript
async function uploadMultipleFiles(propertyId, files, title = null, isVisible = true) {
  const formData = new FormData();

  // Adicionar cada arquivo
  Array.from(files).forEach(file => {
    formData.append('files', file);
  });

  if (title) {
    formData.append('title', title);
  }

  formData.append('isVisible', isVisible.toString());

  const response = await fetch(`http://localhost:3008/properties/${propertyId}/files/multiple`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Erro ao fazer upload dos arquivos');
  }

  const result = await response.json();
  return result;
}
```

#### Exemplo (React Component com Drag & Drop)

```jsx
function MultipleFileUpload({ propertyId }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles].slice(0, 20)); // Máximo 20
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));
      formData.append('isVisible', 'true');

      const response = await fetch(`/api/properties/${propertyId}/files/multiple`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      alert(result.message);
      setFiles([]);
    } catch (error) {
      alert('Erro no upload: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{ border: '2px dashed #ccc', padding: '20px' }}
      >
        Arraste arquivos aqui (máximo 20)
      </div>

      <ul>
        {files.map((file, idx) => (
          <li key={idx}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
        ))}
      </ul>

      <button onClick={handleUpload} disabled={uploading || files.length === 0}>
        {uploading ? 'Enviando...' : `Enviar ${files.length} arquivo(s)`}
      </button>
    </div>
  );
}
```

---

### 4. Buscar Arquivo Específico

**GET** `/properties/files/:fileId`

Retorna os detalhes de um arquivo específico.

#### Parâmetros de URL
- `fileId` (string, obrigatório): UUID do arquivo

#### Resposta de Sucesso (200)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "propertyId": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Certificado Energético",
  "isVisible": true,
  "filename": "abc123.pdf",
  "originalName": "certificado.pdf",
  "mimeType": "application/pdf",
  "fileSize": 2458624,
  "filePath": "http://localhost:3008/uploads/files/abc123.pdf",
  "createdAt": "2025-12-22T10:30:00.000Z",
  "updatedAt": "2025-12-22T10:30:00.000Z"
}
```

#### Erros Possíveis
- **404 Not Found**: "Arquivo com ID {fileId} não encontrado"

#### Exemplo (JavaScript/Fetch)

```javascript
async function getFileById(fileId) {
  const response = await fetch(`http://localhost:3008/properties/files/${fileId}`);

  if (!response.ok) {
    throw new Error('Arquivo não encontrado');
  }

  const file = await response.json();
  return file;
}
```

---

### 5. Atualizar Metadados do Arquivo

**PATCH** `/properties/files/:fileId`

Atualiza o título e/ou visibilidade de um arquivo. **Não permite alterar o arquivo físico**, apenas os metadados.

#### Parâmetros de URL
- `fileId` (string, obrigatório): UUID do arquivo

#### Body (JSON)

```json
{
  "title": "Novo Título do Arquivo",
  "isVisible": false
}
```

**Campos opcionais:**
- `title` (string): Novo título (max 200 caracteres)
- `isVisible` (boolean): Nova visibilidade

#### Resposta de Sucesso (200)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "propertyId": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Novo Título do Arquivo",
  "isVisible": false,
  "filename": "abc123.pdf",
  "originalName": "certificado.pdf",
  "mimeType": "application/pdf",
  "fileSize": 2458624,
  "filePath": "http://localhost:3008/uploads/files/abc123.pdf",
  "createdAt": "2025-12-22T10:30:00.000Z",
  "updatedAt": "2025-12-22T11:45:00.000Z"
}
```

#### Erros Possíveis
- **404 Not Found**: "Arquivo com ID {fileId} não encontrado"
- **400 Bad Request**: Validação falhou (título muito longo, tipo inválido)

#### Exemplo (JavaScript/Fetch)

```javascript
async function updateFile(fileId, updates) {
  const response = await fetch(`http://localhost:3008/properties/files/${fileId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar arquivo');
  }

  const updatedFile = await response.json();
  return updatedFile;
}

// Uso
await updateFile('550e8400-e29b-41d4-a716-446655440000', {
  title: 'Certificado Energético - Classe A',
  isVisible: true,
});
```

---

### 6. Deletar Arquivo

**DELETE** `/properties/files/:fileId`

Remove o arquivo do banco de dados e do disco.

#### Parâmetros de URL
- `fileId` (string, obrigatório): UUID do arquivo

#### Resposta de Sucesso (200)

```json
{
  "message": "Arquivo deletado com sucesso",
  "file": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "propertyId": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Certificado Energético",
    "isVisible": true,
    "filename": "abc123.pdf",
    "originalName": "certificado.pdf",
    "mimeType": "application/pdf",
    "fileSize": 2458624,
    "filePath": "http://localhost:3008/uploads/files/abc123.pdf",
    "createdAt": "2025-12-22T10:30:00.000Z",
    "updatedAt": "2025-12-22T10:30:00.000Z"
  }
}
```

#### Erros Possíveis
- **404 Not Found**: "Arquivo com ID {fileId} não encontrado"

#### Exemplo (JavaScript/Fetch)

```javascript
async function deleteFile(fileId) {
  const response = await fetch(`http://localhost:3008/properties/files/${fileId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar arquivo');
  }

  const result = await response.json();
  return result;
}

// Com confirmação
async function deleteFileWithConfirmation(fileId, fileName) {
  if (confirm(`Tem certeza que deseja deletar "${fileName}"?`)) {
    try {
      const result = await deleteFile(fileId);
      alert(result.message);
    } catch (error) {
      alert('Erro ao deletar: ' + error.message);
    }
  }
}
```

---

## Validações e Regras de Negócio

### Validações de Campo

| Campo | Regras |
|-------|--------|
| `title` | Opcional, máximo 200 caracteres, string |
| `isVisible` | Opcional, boolean (default: true) |
| `file` | Obrigatório no upload, máximo 200 MB |

### Regras de Negócio

1. **Cascade Delete**: Ao deletar uma propriedade, todos os arquivos associados são deletados automaticamente (banco + disco)
2. **Nomes únicos**: Arquivos são salvos com UUID + extensão original para evitar conflitos
3. **Preservação do nome original**: O nome original do arquivo é mantido no campo `originalName`
4. **Ordem**: Arquivos são retornados do mais recente para o mais antigo
5. **Limite de upload múltiplo**: Máximo 20 arquivos por requisição

---

## Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| **200** | Sucesso (GET, PATCH, DELETE) |
| **201** | Criado com sucesso (POST) |
| **400** | Requisição inválida (validação falhou, arquivo não enviado) |
| **404** | Recurso não encontrado (propriedade ou arquivo) |
| **413** | Payload muito grande (arquivo maior que 200MB) |
| **500** | Erro interno do servidor |

---

## Exemplos de Integração Completa

### Componente React: Gerenciador de Arquivos

```jsx
import { useState, useEffect } from 'react';

function PropertyFileManager({ propertyId }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Carregar arquivos ao montar
  useEffect(() => {
    loadFiles();
  }, [propertyId]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/properties/${propertyId}/files`);
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Erro ao carregar arquivos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('isVisible', 'true');

      const response = await fetch(`/api/properties/${propertyId}/files`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload falhou');

      await loadFiles(); // Recarregar lista
      alert('Arquivo enviado com sucesso!');
    } catch (error) {
      alert('Erro no upload: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileId, fileName) => {
    if (!confirm(`Deletar "${fileName}"?`)) return;

    try {
      const response = await fetch(`/api/properties/files/${fileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao deletar');

      await loadFiles(); // Recarregar lista
      alert('Arquivo deletado!');
    } catch (error) {
      alert('Erro: ' + error.message);
    }
  };

  const toggleVisibility = async (fileId, currentVisibility) => {
    try {
      const response = await fetch(`/api/properties/files/${fileId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: !currentVisibility }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar');

      await loadFiles(); // Recarregar lista
    } catch (error) {
      alert('Erro: ' + error.message);
    }
  };

  if (loading) return <div>Carregando arquivos...</div>;

  return (
    <div>
      <h2>Arquivos da Propriedade</h2>

      {/* Upload */}
      <div>
        <input
          type="file"
          onChange={handleUpload}
          disabled={uploading}
        />
        {uploading && <span>Enviando...</span>}
      </div>

      {/* Lista de arquivos */}
      <div>
        {files.length === 0 ? (
          <p>Nenhum arquivo enviado</p>
        ) : (
          <ul>
            {files.map(file => (
              <li key={file.id}>
                <a href={file.filePath} target="_blank" rel="noopener noreferrer">
                  {file.title || file.originalName}
                </a>
                <span> ({(file.fileSize / 1024 / 1024).toFixed(2)} MB)</span>

                <button onClick={() => toggleVisibility(file.id, file.isVisible)}>
                  {file.isVisible ? 'Ocultar' : 'Mostrar'}
                </button>

                <button onClick={() => handleDelete(file.id, file.title)}>
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PropertyFileManager;
```

---

## Tratamento de Erros

### Estrutura de Erro Padrão

```json
{
  "statusCode": 400,
  "message": "Nenhum arquivo foi enviado",
  "error": "Bad Request"
}
```

ou para erros de validação:

```json
{
  "statusCode": 400,
  "message": [
    "O título deve ter no máximo 200 caracteres",
    "O campo visível deve ser verdadeiro ou falso"
  ],
  "error": "Bad Request"
}
```

### Exemplo de Tratamento Global

```javascript
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();

      // Tratar array de mensagens de validação
      if (Array.isArray(error.message)) {
        throw new Error(error.message.join(', '));
      }

      throw new Error(error.message || 'Erro na requisição');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
}
```

---

## Dicas de Implementação

### 1. Preview de Arquivos

```javascript
function getFileIcon(mimeType) {
  if (mimeType.startsWith('image/')) return '🖼️';
  if (mimeType === 'application/pdf') return '📄';
  if (mimeType.includes('word')) return '📝';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
  return '📎';
}
```

### 2. Formatação de Tamanho

```javascript
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
```

### 3. Validação de Tamanho no Frontend

```javascript
function validateFileSize(file, maxSizeMB = 200) {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (file.size > maxSizeBytes) {
    throw new Error(`Arquivo muito grande. Máximo: ${maxSizeMB}MB`);
  }

  return true;
}
```

### 4. Progress Bar para Upload

```javascript
async function uploadWithProgress(propertyId, file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('isVisible', 'true');

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        onProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error('Upload falhou'));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Erro de rede')));

    xhr.open('POST', `/api/properties/${propertyId}/files`);
    xhr.send(formData);
  });
}
```

---

## Notas de Produção

### Segurança
- Os arquivos são salvos com nomes UUID para evitar conflitos e tentativas de path traversal
- Validação de tamanho no backend (200MB máximo)
- Sem validação de tipo de arquivo no backend (aceita qualquer tipo)

### Performance
- Arquivos são servidos diretamente pelo Express como arquivos estáticos
- Considere implementar CDN para arquivos grandes em produção
- Os arquivos não são processados (diferente de imagens que são convertidas para WebP)

### Backup
- Faça backup regular da pasta `uploads/files/`
- Considere armazenamento em nuvem (S3, Azure Blob, etc.) para produção

---

## Suporte

Para dúvidas ou problemas, entre em contato com a equipe de backend.

**Base URL de Produção**: `https://api.agenciadodouro.com` (atualizar conforme necessário)

**Última atualização**: 22 de dezembro de 2025
