# Feature: Seções de Imagens para Propriedades

## Visão Geral

Foi implementada uma nova funcionalidade que permite organizar as imagens das propriedades em **seções** (ex: "Cozinha", "Sala", "Quartos", "Exterior", etc.).

### Compatibilidade
- ✅ O campo antigo `images` (array simples de URLs) continua funcionando
- ✅ Propriedades podem ter tanto `images` quanto `imageSections`
- ✅ 100% retrocompatível com o código existente

## Estrutura de Dados

### PropertyImageSection
```typescript
{
  id: string;                    // UUID da seção
  propertyId: string;            // UUID da propriedade
  sectionName: string;           // Nome da seção (ex: "Cozinha")
  images: string[];              // Array de URLs das imagens
  displayOrder: number;          // Ordem de exibição (0, 1, 2...)
  createdAt: Date;
  updatedAt: Date;
}
```

### Property (atualizada)
```typescript
{
  // ... todos os campos existentes ...
  images: string[];                    // MANTIDO: array simples de imagens
  imageSections: PropertyImageSection[]; // NOVO: seções organizadas
}
```

## API Endpoints

### 1. Listar Seções de uma Propriedade
```
GET /properties/:id/image-sections
```

**Resposta:**
```json
[
  {
    "id": "uuid",
    "propertyId": "uuid",
    "sectionName": "Cozinha",
    "images": [
      "https://res.cloudinary.com/...",
      "https://res.cloudinary.com/..."
    ],
    "displayOrder": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": "uuid",
    "propertyId": "uuid",
    "sectionName": "Sala de Estar",
    "images": ["https://res.cloudinary.com/..."],
    "displayOrder": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 2. Criar Nova Seção de Imagens
```
POST /properties/:id/image-sections
Content-Type: multipart/form-data
```

**Body (FormData):**
```javascript
{
  sectionName: string;        // Obrigatório
  displayOrder?: number;      // Opcional (padrão: 0)
  images?: File[];            // Opcional: arquivos de imagem
}
```

**Exemplo de uso:**
```javascript
const formData = new FormData();
formData.append('sectionName', 'Cozinha');
formData.append('displayOrder', '0');

// Adicionar múltiplas imagens
imageFiles.forEach(file => {
  formData.append('images', file);
});

const response = await fetch(`/properties/${propertyId}/image-sections`, {
  method: 'POST',
  body: formData
});

const section = await response.json();
```

**Resposta:**
```json
{
  "id": "uuid",
  "propertyId": "uuid",
  "sectionName": "Cozinha",
  "images": [
    "https://res.cloudinary.com/...",
    "https://res.cloudinary.com/..."
  ],
  "displayOrder": 0,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 3. Atualizar Seção de Imagens
```
PATCH /properties/image-sections/:sectionId
Content-Type: multipart/form-data
```

**Body (FormData):**
```javascript
{
  sectionName?: string;           // Opcional: novo nome
  displayOrder?: number;          // Opcional: nova ordem
  imagesToRemove?: string[];      // Opcional: URLs para remover
  imagesToAdd?: File[];           // Opcional: novos arquivos
}
```

**Exemplo de uso:**
```javascript
const formData = new FormData();

// Atualizar nome da seção
formData.append('sectionName', 'Cozinha Gourmet');

// Remover imagens específicas
formData.append('imagesToRemove', JSON.stringify([
  'https://res.cloudinary.com/old-image-1.jpg',
  'https://res.cloudinary.com/old-image-2.jpg'
]));

// Adicionar novas imagens
newImageFiles.forEach(file => {
  formData.append('imagesToAdd', file);
});

// Mudar ordem de exibição
formData.append('displayOrder', '2');

const response = await fetch(`/properties/image-sections/${sectionId}`, {
  method: 'PATCH',
  body: formData
});

const updatedSection = await response.json();
```

**Resposta:**
```json
{
  "id": "uuid",
  "propertyId": "uuid",
  "sectionName": "Cozinha Gourmet",
  "images": [
    "https://res.cloudinary.com/remaining-image.jpg",
    "https://res.cloudinary.com/new-image-1.jpg",
    "https://res.cloudinary.com/new-image-2.jpg"
  ],
  "displayOrder": 2,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 4. Deletar Seção de Imagens
```
DELETE /properties/image-sections/:sectionId
```

**Resposta:**
```json
{
  "message": "Seção de imagens deletada com sucesso",
  "section": {
    "id": "uuid",
    "propertyId": "uuid",
    "sectionName": "Cozinha",
    "images": [],
    "displayOrder": 0
  }
}
```

**IMPORTANTE:** Ao deletar uma seção, todas as imagens associadas são automaticamente removidas do Cloudinary.

### 5. Buscar Propriedade (atualizado)
```
GET /properties/:id
```

**Resposta (agora inclui imageSections):**
```json
{
  "id": "uuid",
  "title": "Apartamento T3",
  "description": "...",
  "images": [
    "https://res.cloudinary.com/main-1.jpg",
    "https://res.cloudinary.com/main-2.jpg"
  ],
  "imageSections": [
    {
      "id": "uuid",
      "propertyId": "uuid",
      "sectionName": "Cozinha",
      "images": ["https://res.cloudinary.com/kitchen-1.jpg"],
      "displayOrder": 0,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "uuid",
      "propertyId": "uuid",
      "sectionName": "Sala",
      "images": ["https://res.cloudinary.com/living-1.jpg"],
      "displayOrder": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  // ... outros campos da propriedade ...
}
```

**Nota:** As seções são retornadas ordenadas por `displayOrder` (ASC).

## Validações

### CreateImageSectionDto
- `sectionName`: **Obrigatório**, string, máximo 100 caracteres
- `displayOrder`: Opcional, número inteiro ≥ 0 (padrão: 0)
- `images`: Opcional, array de arquivos de imagem

### UpdateImageSectionDto
- `sectionName`: Opcional, string, máximo 100 caracteres
- `displayOrder`: Opcional, número inteiro ≥ 0
- `images`: Opcional, array de strings (URLs)
- `imagesToRemove`: Opcional, array de strings (URLs)

### Validações de Upload
- Tamanho máximo por imagem: 5MB
- Formatos aceitos: jpg, jpeg, png, gif, webp
- Máximo de 10 imagens por requisição

## Fluxo Recomendado para o Frontend

### 1. Criar/Editar Propriedade com Seções

**Interface Sugerida:**
```tsx
interface ImageSection {
  id?: string;  // Presente se já existir, ausente se for nova
  sectionName: string;
  images: File[] | string[];  // Files para upload, strings para existentes
  displayOrder: number;
  imagesToRemove?: string[];  // URLs a remover (só para update)
}

// Exemplo de estado
const [imageSections, setImageSections] = useState<ImageSection[]>([
  {
    sectionName: 'Cozinha',
    images: [],
    displayOrder: 0
  },
  {
    sectionName: 'Sala',
    images: [],
    displayOrder: 1
  }
]);
```

### 2. Ao Criar uma Propriedade

**Opção A: Criar seções depois de criar a propriedade**
```javascript
// 1. Criar a propriedade primeiro
const property = await createProperty(propertyData);

// 2. Criar cada seção de imagem
for (const section of imageSections) {
  const formData = new FormData();
  formData.append('sectionName', section.sectionName);
  formData.append('displayOrder', section.displayOrder.toString());

  section.images.forEach(file => {
    formData.append('images', file);
  });

  await fetch(`/properties/${property.id}/image-sections`, {
    method: 'POST',
    body: formData
  });
}
```

**Opção B: Usar o campo imageSections no CreatePropertyDto** (já suportado)
```javascript
// NOTA: Esta opção está preparada no backend mas requer
// que você envie as seções no formato correto
const propertyData = {
  // ... campos normais ...
  imageSections: [
    {
      sectionName: 'Cozinha',
      images: ['url1', 'url2'],  // URLs ou vazio se for fazer upload depois
      displayOrder: 0
    }
  ]
};
```

### 3. Ao Editar uma Propriedade

```javascript
// Buscar propriedade com seções
const property = await fetch(`/properties/${id}`).then(r => r.json());

// property.imageSections contém as seções existentes

// Para adicionar nova seção
await createImageSection(property.id, newSection);

// Para atualizar seção existente
await updateImageSection(section.id, updates);

// Para deletar seção
await deleteImageSection(section.id);
```

### 4. Componente de Exemplo (React)

```tsx
function PropertyImageSections({ propertyId }: { propertyId: string }) {
  const [sections, setSections] = useState<PropertyImageSection[]>([]);

  useEffect(() => {
    fetch(`/properties/${propertyId}/image-sections`)
      .then(r => r.json())
      .then(setSections);
  }, [propertyId]);

  const addSection = async (sectionName: string, images: File[]) => {
    const formData = new FormData();
    formData.append('sectionName', sectionName);
    formData.append('displayOrder', sections.length.toString());

    images.forEach(file => formData.append('images', file));

    const newSection = await fetch(
      `/properties/${propertyId}/image-sections`,
      { method: 'POST', body: formData }
    ).then(r => r.json());

    setSections([...sections, newSection]);
  };

  const removeSection = async (sectionId: string) => {
    await fetch(`/properties/image-sections/${sectionId}`, {
      method: 'DELETE'
    });

    setSections(sections.filter(s => s.id !== sectionId));
  };

  return (
    <div>
      {sections.map(section => (
        <div key={section.id}>
          <h3>{section.sectionName}</h3>
          <div className="images">
            {section.images.map(url => (
              <img key={url} src={url} alt={section.sectionName} />
            ))}
          </div>
          <button onClick={() => removeSection(section.id)}>
            Deletar Seção
          </button>
        </div>
      ))}

      <button onClick={() => {/* abrir modal para adicionar */}}>
        Adicionar Seção
      </button>
    </div>
  );
}
```

## UI/UX Sugeridas

### Página de Criação/Edição de Propriedade

1. **Manter o upload de imagens principais** (campo `images`)
   - Para fotos de capa/destaque

2. **Adicionar seção "Galeria Organizada por Seções"**
   ```
   [+ Adicionar Seção]

   ┌─────────────────────────────────────┐
   │ 📷 Cozinha                    [×]   │
   │ [+ Adicionar Imagens]              │
   │ ┌──┐ ┌──┐ ┌──┐                     │
   │ │  │ │  │ │  │                     │
   │ └──┘ └──┘ └──┘                     │
   └─────────────────────────────────────┘

   ┌─────────────────────────────────────┐
   │ 🛏️ Quartos                    [×]   │
   │ [+ Adicionar Imagens]              │
   │ ┌──┐ ┌──┐                          │
   │ │  │ │  │                          │
   │ └──┘ └──┘                          │
   └─────────────────────────────────────┘
   ```

3. **Funcionalidades:**
   - Arrastar para reordenar seções (atualiza `displayOrder`)
   - Adicionar/remover imagens de cada seção
   - Renomear seções
   - Deletar seções completas

### Página de Detalhes da Propriedade

```
┌─────────────────────────────────────┐
│ [Imagens Principais - Carrossel]   │
└─────────────────────────────────────┘

Galeria por Ambientes
──────────────────────

[Cozinha] [Sala] [Quartos] [Banheiros] [Exterior]

┌──────────────────────────────┐
│  [Fotos da seção selecionada]│
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐   │
│  │   │ │   │ │   │ │   │   │
│  └───┘ └───┘ └───┘ └───┘   │
└──────────────────────────────┘
```

## Nomes de Seções Comuns (Sugestões)

Para facilitar a UX, você pode sugerir nomes de seções:

```javascript
const suggestedSections = [
  'Cozinha',
  'Sala de Estar',
  'Sala de Jantar',
  'Quartos',
  'Quarto Principal',
  'Banheiros',
  'Escritório',
  'Lavandaria',
  'Garagem',
  'Exterior',
  'Jardim',
  'Piscina',
  'Varanda',
  'Vista',
  'Área Comum',
  'Ginásio',
  'Outros'
];
```

## Migração de Dados Existentes

Não é necessária migração. As propriedades existentes:
- Continuam com o campo `images` funcionando normalmente
- Podem adicionar `imageSections` gradualmente
- Não há conflito entre os dois sistemas

## Erros Comuns e Tratamento

### 404 - Not Found
```json
{
  "statusCode": 404,
  "message": "Propriedade com ID xxx não encontrada"
}
```
ou
```json
{
  "statusCode": 404,
  "message": "Seção de imagens com ID xxx não encontrada"
}
```

### 400 - Bad Request
```json
{
  "statusCode": 400,
  "message": [
    "O nome da seção é obrigatório",
    "O nome da seção deve ter no máximo 100 caracteres"
  ],
  "error": "Bad Request"
}
```

### 413 - Payload Too Large
Quando a imagem excede 5MB

## Performance

- As seções são carregadas junto com a propriedade via relacionamento
- Use lazy loading para imagens na galeria
- Considere paginação se uma propriedade tiver muitas seções (>20)

## Checklist de Implementação

- [ ] Atualizar interface TypeScript de `Property` para incluir `imageSections`
- [ ] Criar interface `PropertyImageSection`
- [ ] Criar componente para gerenciar seções na criação/edição
- [ ] Criar componente de galeria por seções na página de detalhes
- [ ] Adicionar drag-and-drop para reordenar seções
- [ ] Implementar upload de múltiplas imagens por seção
- [ ] Adicionar confirmação antes de deletar seção
- [ ] Testar upload de imagens grandes (próximo de 5MB)
- [ ] Testar remoção de imagens do Cloudinary
- [ ] Adicionar loading states durante uploads
- [ ] Implementar preview de imagens antes do upload

## Dúvidas?

Entre em contato com o backend para esclarecimentos sobre:
- Limites de upload
- Formatos de imagem suportados
- Estrutura de dados
- Novos endpoints necessários
