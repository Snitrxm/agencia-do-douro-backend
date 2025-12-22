# API de Relacionamentos entre Propriedades

## 📋 Visão Geral

A API agora suporta relacionamentos entre propriedades, permitindo que uma propriedade esteja relacionada com outras propriedades. Este recurso é útil para:

- **Mostrar propriedades similares** na página de detalhes
- **Agrupar propriedades do mesmo empreendimento**
- **Sugerir alternativas** ao utilizador

### Características Principais

- ✅ **Relacionamento Unidirecional**: Se Property A está relacionada com B, B não está automaticamente relacionada com A
- ✅ **Sem Limites**: Quantidade ilimitada de propriedades relacionadas
- ✅ **Lazy Loading**: Relacionamentos só são carregados quando solicitado
- ✅ **Sugestões Automáticas**: Endpoint para buscar propriedades similares baseado em critérios
- ✅ **Validações**: UUIDs válidos, propriedades existentes, sem auto-relacionamento

---

## 🔗 Endpoints Disponíveis

### 1. Buscar Propriedade com Relacionadas

Busca uma propriedade específica, opcionalmente incluindo suas propriedades relacionadas.

**Endpoint:** `GET /properties/:id`

**Query Parameters:**
- `includeRelated` (opcional): `"true"` para incluir propriedades relacionadas

**Exemplos:**

```bash
# Sem relacionadas (comportamento padrão)
GET /properties/123e4567-e89b-12d3-a456-426614174000

# Com relacionadas incluídas
GET /properties/123e4567-e89b-12d3-a456-426614174000?includeRelated=true
```

**Response (com includeRelated=true):**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Apartamento T3 no Porto",
  "description": "Apartamento moderno...",
  "price": 250000,
  "propertyType": "Apartamento",
  "transactionType": "comprar",
  "distrito": "Porto",
  "concelho": "Porto",
  "bedrooms": 3,
  "bathrooms": 2,
  "image": "https://...",
  "status": "active",
  "relatedProperties": [
    {
      "id": "uuid-related-1",
      "title": "Apartamento T2 no Porto",
      "price": 200000,
      "propertyType": "Apartamento",
      "image": "https://...",
      "bedrooms": 2,
      "bathrooms": 2
    },
    {
      "id": "uuid-related-2",
      "title": "Apartamento T4 no Porto",
      "price": 300000,
      "propertyType": "Apartamento",
      "image": "https://...",
      "bedrooms": 4,
      "bathrooms": 3
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-20T14:45:00Z"
}
```

---

### 2. Listar Propriedades Relacionadas

Busca apenas as propriedades relacionadas a uma propriedade específica.

**Endpoint:** `GET /properties/:id/related`

**Exemplo:**

```bash
GET /properties/123e4567-e89b-12d3-a456-426614174000/related
```

**Response:**

```json
[
  {
    "id": "uuid-related-1",
    "title": "Apartamento T2 no Porto",
    "description": "...",
    "price": 200000,
    "propertyType": "Apartamento",
    "transactionType": "comprar",
    "distrito": "Porto",
    "bedrooms": 2,
    "bathrooms": 2,
    "image": "https://...",
    "status": "active",
    "createdAt": "2024-01-10T08:00:00Z"
  },
  {
    "id": "uuid-related-2",
    "title": "Apartamento T4 no Porto",
    "description": "...",
    "price": 300000,
    "propertyType": "Apartamento",
    "transactionType": "comprar",
    "distrito": "Porto",
    "bedrooms": 4,
    "bathrooms": 3,
    "image": "https://...",
    "status": "active",
    "createdAt": "2024-01-12T09:15:00Z"
  }
]
```

---

### 3. Buscar Propriedades Similares (Sugestões Automáticas)

Busca propriedades similares baseadas em critérios automáticos. Útil para sugerir propriedades relacionadas sem ter que definir manualmente.

**Endpoint:** `GET /properties/:id/similar`

**Query Parameters:**
- `limit` (opcional): Número de resultados (padrão: 5, máximo recomendado: 10)

**Critérios de Similaridade:**
- ✅ Mesmo tipo de propriedade (Apartamento, Moradia, etc.)
- ✅ Mesmo tipo de transação (comprar, arrendar, vender)
- ✅ Mesmo distrito
- ✅ Preço similar (±30% do preço da propriedade original)
- ✅ Status ativo
- ✅ Ordenado por data de criação (mais recentes primeiro)

**Exemplos:**

```bash
# Buscar 5 propriedades similares (padrão)
GET /properties/123e4567-e89b-12d3-a456-426614174000/similar

# Buscar 10 propriedades similares
GET /properties/123e4567-e89b-12d3-a456-426614174000/similar?limit=10
```

**Response:**

```json
[
  {
    "id": "uuid-similar-1",
    "title": "Apartamento T3 em Matosinhos",
    "price": 260000,
    "propertyType": "Apartamento",
    "transactionType": "comprar",
    "distrito": "Porto",
    "concelho": "Matosinhos",
    "bedrooms": 3,
    "bathrooms": 2,
    "image": "https://...",
    "status": "active"
  },
  {
    "id": "uuid-similar-2",
    "title": "Apartamento T3 em Vila Nova de Gaia",
    "price": 240000,
    "propertyType": "Apartamento",
    "transactionType": "comprar",
    "distrito": "Porto",
    "concelho": "Vila Nova de Gaia",
    "bedrooms": 3,
    "bathrooms": 2,
    "image": "https://...",
    "status": "active"
  }
]
```

---

### 4. Adicionar Propriedades Relacionadas

Adiciona novas propriedades relacionadas, mantendo as existentes.

**Endpoint:** `POST /properties/:id/related`

**Request Body:**

```json
{
  "relatedPropertyIds": [
    "uuid-property-1",
    "uuid-property-2",
    "uuid-property-3"
  ]
}
```

**Validações:**
- ✅ Todos os IDs devem ser UUIDs válidos
- ✅ Todas as propriedades devem existir no banco de dados
- ✅ Uma propriedade não pode ser relacionada a si mesma
- ✅ Duplicatas são automaticamente ignoradas

**Exemplo:**

```bash
POST /properties/123e4567-e89b-12d3-a456-426614174000/related
Content-Type: application/json

{
  "relatedPropertyIds": [
    "uuid-property-1",
    "uuid-property-2"
  ]
}
```

**Response (200 OK):**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Apartamento T3 no Porto",
  "relatedProperties": [
    {
      "id": "uuid-existing-1",
      "title": "Propriedade já relacionada"
    },
    {
      "id": "uuid-property-1",
      "title": "Nova propriedade relacionada 1"
    },
    {
      "id": "uuid-property-2",
      "title": "Nova propriedade relacionada 2"
    }
  ],
  ...
}
```

**Possíveis Erros:**

```json
// 404 - Propriedade não encontrada
{
  "statusCode": 404,
  "message": "Propriedade com ID xxx não encontrada"
}

// 400 - UUIDs inválidos
{
  "statusCode": 400,
  "message": "Cada ID deve ser um UUID válido"
}

// 500 - Propriedades relacionadas não existem
{
  "statusCode": 500,
  "message": "Propriedades não encontradas: uuid-1, uuid-2"
}

// 500 - Tentativa de auto-relacionamento
{
  "statusCode": 500,
  "message": "Uma propriedade não pode ser relacionada a si mesma"
}
```

---

### 5. Remover Propriedades Relacionadas

Remove propriedades relacionadas específicas, mantendo as demais.

**Endpoint:** `DELETE /properties/:id/related`

**Request Body:**

```json
{
  "relatedPropertyIds": [
    "uuid-property-1",
    "uuid-property-2"
  ]
}
```

**Exemplo:**

```bash
DELETE /properties/123e4567-e89b-12d3-a456-426614174000/related
Content-Type: application/json

{
  "relatedPropertyIds": [
    "uuid-property-1"
  ]
}
```

**Response (200 OK):**

```json
{
  "message": "Propriedades relacionadas removidas com sucesso",
  "property": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Apartamento T3 no Porto",
    "relatedProperties": [
      {
        "id": "uuid-property-2",
        "title": "Propriedade que permanece relacionada"
      }
    ]
  }
}
```

---

### 6. Substituir Todas as Propriedades Relacionadas

Define (substitui) todas as propriedades relacionadas. Use array vazio para limpar todos os relacionamentos.

**Endpoint:** `PATCH /properties/:id/related`

**Request Body:**

```json
{
  "relatedPropertyIds": [
    "uuid-property-3",
    "uuid-property-4"
  ]
}
```

**Exemplos:**

```bash
# Substituir todas as relacionadas
PATCH /properties/123e4567-e89b-12d3-a456-426614174000/related
Content-Type: application/json

{
  "relatedPropertyIds": [
    "uuid-property-3",
    "uuid-property-4"
  ]
}

# Limpar todas as relacionadas (array vazio)
PATCH /properties/123e4567-e89b-12d3-a456-426614174000/related
Content-Type: application/json

{
  "relatedPropertyIds": []
}
```

**Response (200 OK):**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Apartamento T3 no Porto",
  "relatedProperties": [
    {
      "id": "uuid-property-3",
      "title": "Nova propriedade relacionada 3"
    },
    {
      "id": "uuid-property-4",
      "title": "Nova propriedade relacionada 4"
    }
  ],
  ...
}
```

---

### 7. Criar Propriedade com Relacionamentos

Ao criar uma nova propriedade, pode incluir relacionamentos diretamente.

**Endpoint:** `POST /properties`

**Request Body (campos principais + relatedPropertyIds):**

```json
{
  "title": "Apartamento T3 Novo",
  "description": "Apartamento moderno com vista mar",
  "propertyType": "Apartamento",
  "transactionType": "comprar",
  "price": 250000,
  "bedrooms": 3,
  "bathrooms": 2,
  "distrito": "Porto",
  "concelho": "Porto",
  "address": "Rua das Flores, 123",
  "image": "https://...",
  "relatedPropertyIds": [
    "uuid-property-1",
    "uuid-property-2"
  ]
}
```

**Response (201 Created):**

```json
{
  "id": "novo-uuid-gerado",
  "title": "Apartamento T3 Novo",
  "price": 250000,
  "relatedProperties": [
    {
      "id": "uuid-property-1",
      "title": "Propriedade Relacionada 1"
    },
    {
      "id": "uuid-property-2",
      "title": "Propriedade Relacionada 2"
    }
  ],
  "createdAt": "2024-01-22T10:00:00Z",
  ...
}
```

---

### 8. Atualizar Propriedade com Relacionamentos

Ao atualizar uma propriedade, pode modificar os relacionamentos.

**Endpoint:** `PATCH /properties/:id`

**Request Body (apenas campos que deseja atualizar):**

```json
{
  "price": 260000,
  "relatedPropertyIds": [
    "uuid-property-3",
    "uuid-property-4"
  ]
}
```

**Comportamento:**
- Se `relatedPropertyIds` for fornecido, **substitui todos** os relacionamentos existentes
- Se `relatedPropertyIds` for um array vazio `[]`, **limpa todos** os relacionamentos
- Se `relatedPropertyIds` **não for fornecido**, os relacionamentos **permanecem inalterados**

---

## 💡 Casos de Uso Frontend

### Caso 1: Página de Detalhes - Mostrar Propriedades Relacionadas

```javascript
// Buscar propriedade com relacionadas incluídas
async function fetchPropertyDetails(propertyId) {
  const response = await fetch(
    `${API_URL}/properties/${propertyId}?includeRelated=true`
  );
  const property = await response.json();

  // Renderizar propriedade principal
  renderPropertyDetails(property);

  // Renderizar seção "Propriedades Relacionadas" ou "Mais do mesmo empreendimento"
  if (property.relatedProperties && property.relatedProperties.length > 0) {
    renderRelatedProperties(property.relatedProperties);
  }
}
```

### Caso 2: Página de Detalhes - Sugerir Propriedades Similares

```javascript
// Buscar e mostrar propriedades similares
async function fetchSimilarProperties(propertyId) {
  const response = await fetch(
    `${API_URL}/properties/${propertyId}/similar?limit=6`
  );
  const similarProperties = await response.json();

  // Renderizar seção "Você também pode gostar" ou "Propriedades Similares"
  renderSuggestedProperties(similarProperties);
}
```

### Caso 3: Painel Admin - Gerenciar Relacionamentos

```javascript
// Adicionar propriedades relacionadas
async function addRelatedProperties(propertyId, relatedIds) {
  const response = await fetch(
    `${API_URL}/properties/${propertyId}/related`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ relatedPropertyIds: relatedIds })
    }
  );

  if (response.ok) {
    const updatedProperty = await response.json();
    console.log('Relacionamentos adicionados:', updatedProperty.relatedProperties);
  }
}

// Remover uma propriedade relacionada
async function removeRelatedProperty(propertyId, relatedIdToRemove) {
  const response = await fetch(
    `${API_URL}/properties/${propertyId}/related`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ relatedPropertyIds: [relatedIdToRemove] })
    }
  );

  if (response.ok) {
    const result = await response.json();
    console.log('Relacionamento removido:', result.message);
  }
}

// Substituir todos os relacionamentos
async function setRelatedProperties(propertyId, newRelatedIds) {
  const response = await fetch(
    `${API_URL}/properties/${propertyId}/related`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ relatedPropertyIds: newRelatedIds })
    }
  );

  if (response.ok) {
    const updatedProperty = await response.json();
    console.log('Relacionamentos atualizados:', updatedProperty.relatedProperties);
  }
}
```

### Caso 4: Criar Propriedade com Relacionamentos

```javascript
async function createPropertyWithRelationships(formData) {
  const propertyData = {
    title: formData.title,
    description: formData.description,
    price: formData.price,
    propertyType: formData.propertyType,
    transactionType: formData.transactionType,
    bedrooms: formData.bedrooms,
    bathrooms: formData.bathrooms,
    distrito: formData.distrito,
    concelho: formData.concelho,
    // Incluir IDs de propriedades relacionadas se selecionadas
    relatedPropertyIds: formData.selectedRelatedProperties || []
  };

  const response = await fetch(`${API_URL}/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(propertyData)
  });

  if (response.ok) {
    const newProperty = await response.json();
    console.log('Propriedade criada com relacionamentos:', newProperty);
  }
}
```

---

## 🎨 Sugestões de UI/UX

### 1. Página de Detalhes

**Seção "Propriedades Relacionadas":**
```
┌─────────────────────────────────────────────┐
│  🏠 Mais Propriedades Deste Empreendimento  │
├─────────────────────────────────────────────┤
│  [Card]  [Card]  [Card]  [Card]             │
│  T2      T3      T4      Penthouse          │
│  200k    250k    300k    500k               │
└─────────────────────────────────────────────┘
```

**Seção "Você Também Pode Gostar":**
```
┌─────────────────────────────────────────────┐
│  ✨ Você Também Pode Gostar                 │
│  (Propriedades similares automáticas)       │
├─────────────────────────────────────────────┤
│  [Card]  [Card]  [Card]  [Card]  [Card]     │
└─────────────────────────────────────────────┘
```

### 2. Painel Admin - Formulário de Propriedade

**Campo para Relacionamentos:**
```
┌─────────────────────────────────────────────┐
│  Propriedades Relacionadas (Opcional)       │
├─────────────────────────────────────────────┤
│  [🔍 Pesquisar propriedades...]             │
│                                             │
│  Selecionadas:                              │
│  ✓ Apartamento T2 - Porto (200.000€) [x]   │
│  ✓ Apartamento T4 - Porto (300.000€) [x]   │
│                                             │
│  [Ver Sugestões Automáticas]               │
└─────────────────────────────────────────────┘
```

**Botão "Ver Sugestões Automáticas":**
- Chama o endpoint `/similar` para mostrar propriedades similares
- Permite adicionar rapidamente propriedades relacionadas relevantes

---

## 🔄 Fluxo Completo de Exemplo

### Cenário: Empreendimento com Múltiplas Unidades

**1. Criar Propriedade Principal (Penthouse):**
```bash
POST /properties
{
  "title": "Penthouse T4 - Edifício Vista Mar",
  "price": 500000,
  "isEmpreendimento": true,
  ...
}
# Response: { id: "penthouse-uuid", ... }
```

**2. Criar Outras Unidades:**
```bash
POST /properties
{
  "title": "Apartamento T2 - Edifício Vista Mar",
  "price": 200000,
  "isEmpreendimento": true,
  "relatedPropertyIds": ["penthouse-uuid"]
}

POST /properties
{
  "title": "Apartamento T3 - Edifício Vista Mar",
  "price": 250000,
  "isEmpreendimento": true,
  "relatedPropertyIds": ["penthouse-uuid", "t2-uuid"]
}
```

**3. Frontend - Página de Detalhes do Penthouse:**
```javascript
// Buscar com relacionadas
const response = await fetch('/properties/penthouse-uuid?includeRelated=true');
const property = await response.json();

// Mostrar "Outras unidades disponíveis neste empreendimento"
property.relatedProperties.forEach(unit => {
  renderUnitCard(unit); // T2, T3, etc.
});
```

**4. Frontend - Adicionar Mais Relacionamentos via Admin:**
```javascript
// Adicionar novo T4 como relacionado ao Penthouse
await fetch('/properties/penthouse-uuid/related', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    relatedPropertyIds: ['novo-t4-uuid']
  })
});
```

---

## ⚠️ Notas Importantes

### Performance
- **Lazy Loading**: Por padrão, relacionamentos **não** são carregados. Use `?includeRelated=true` apenas quando necessário
- **Limite de Similares**: Use `limit` razoável (5-10) no endpoint `/similar` para evitar sobrecarga

### Validações
- Todos os IDs devem ser **UUIDs v4** válidos
- Propriedades relacionadas devem **existir** no banco de dados
- Uma propriedade **não pode** ser relacionada a si mesma
- Duplicatas são **automaticamente ignoradas** ao adicionar

### Boas Práticas
1. **Use `/similar` para sugestões automáticas** antes de definir manualmente
2. **Combine ambos**: Mostre propriedades relacionadas manuais + sugestões automáticas
3. **Cache no frontend**: Cache a lista de relacionadas por alguns minutos
4. **Loading states**: Endpoints podem demorar com muitas propriedades

---

## 📞 Suporte

Se tiver dúvidas ou encontrar problemas, entre em contato com o backend team.

**Documentação gerada em:** Janeiro 2025
**Versão da API:** 1.0.0
