import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TranslationService } from './translation/translation.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Property } from './properties/entities/property.entity';
import { PropertyFractionColumn } from './properties/entities/property-fraction-column.entity';

interface TranslatableField {
  ptField: string;
  enField: string;
  frField: string;
}

const PROPERTY_FIELDS: TranslatableField[] = [
  { ptField: 'title_pt', enField: 'title_en', frField: 'title_fr' },
  {
    ptField: 'description_pt',
    enField: 'description_en',
    frField: 'description_fr',
  },
  {
    ptField: 'paymentConditions_pt',
    enField: 'paymentConditions_en',
    frField: 'paymentConditions_fr',
  },
  { ptField: 'features', enField: 'features_en', frField: 'features_fr' },
  { ptField: 'whyChoose', enField: 'whyChoose_en', frField: 'whyChoose_fr' },
];

const FRACTION_COLUMN_FIELDS: TranslatableField[] = [
  { ptField: 'label_pt', enField: 'label_en', frField: 'label_fr' },
];

function isMissing(value: any): boolean {
  return value === null || value === undefined || value === '';
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const translationService = app.get(TranslationService);
  const propertyRepo = app.get<Repository<Property>>(
    getRepositoryToken(Property),
  );
  const fractionColumnRepo = app.get<Repository<PropertyFractionColumn>>(
    getRepositoryToken(PropertyFractionColumn),
  );

  console.log('Starting missing translations scan...\n');

  // --- Translate Properties ---
  const properties = await propertyRepo.find();
  console.log(`Found ${properties.length} properties.`);

  let propertiesTranslated = 0;
  let propertiesSkipped = 0;

  for (const property of properties) {
    const enTexts: string[] = [];
    const frTexts: string[] = [];
    const enFields: string[] = [];
    const frFields: string[] = [];

    for (const field of PROPERTY_FIELDS) {
      const ptValue = property[field.ptField];
      if (!ptValue || ptValue.trim() === '') continue;

      if (isMissing(property[field.enField])) {
        enTexts.push(ptValue);
        enFields.push(field.enField);
      }
      if (isMissing(property[field.frField])) {
        frTexts.push(ptValue);
        frFields.push(field.frField);
      }
    }

    if (enTexts.length === 0 && frTexts.length === 0) {
      propertiesSkipped++;
      continue;
    }

    const updates: Record<string, string> = {};

    if (enTexts.length > 0) {
      const enResults = await translationService.translateBatch(
        enTexts,
        'en-GB',
      );
      enFields.forEach((field, i) => {
        updates[field] = enResults[i];
      });
    }

    if (frTexts.length > 0) {
      const frResults = await translationService.translateBatch(frTexts, 'fr');
      frFields.forEach((field, i) => {
        updates[field] = frResults[i];
      });
    }

    await propertyRepo.update(property.id, updates);
    propertiesTranslated++;

    const translatedFields = [...enFields, ...frFields].join(', ');
    console.log(
      `  Property "${property.title_pt}" - translated: ${translatedFields}`,
    );
  }

  console.log(
    `\nProperties: ${propertiesTranslated} translated, ${propertiesSkipped} already complete.`,
  );

  // --- Translate PropertyFractionColumns ---
  const fractionColumns = await fractionColumnRepo.find();
  console.log(`\nFound ${fractionColumns.length} fraction columns.`);

  let columnsTranslated = 0;
  let columnsSkipped = 0;

  for (const column of fractionColumns) {
    const enTexts: string[] = [];
    const frTexts: string[] = [];
    const enFields: string[] = [];
    const frFields: string[] = [];

    for (const field of FRACTION_COLUMN_FIELDS) {
      const ptValue = column[field.ptField];
      if (!ptValue || ptValue.trim() === '') continue;

      if (isMissing(column[field.enField])) {
        enTexts.push(ptValue);
        enFields.push(field.enField);
      }
      if (isMissing(column[field.frField])) {
        frTexts.push(ptValue);
        frFields.push(field.frField);
      }
    }

    if (enTexts.length === 0 && frTexts.length === 0) {
      columnsSkipped++;
      continue;
    }

    const updates: Record<string, string> = {};

    if (enTexts.length > 0) {
      const enResults = await translationService.translateBatch(
        enTexts,
        'en-GB',
      );
      enFields.forEach((field, i) => {
        updates[field] = enResults[i];
      });
    }

    if (frTexts.length > 0) {
      const frResults = await translationService.translateBatch(frTexts, 'fr');
      frFields.forEach((field, i) => {
        updates[field] = frResults[i];
      });
    }

    await fractionColumnRepo.update(column.id, updates);
    columnsTranslated++;

    const translatedFields = [...enFields, ...frFields].join(', ');
    console.log(
      `  Column "${column.label_pt}" - translated: ${translatedFields}`,
    );
  }

  console.log(
    `\nFraction columns: ${columnsTranslated} translated, ${columnsSkipped} already complete.`,
  );

  console.log('\nDone!');
  await app.close();
}

bootstrap().catch((err) => {
  console.error('Error running translate-missing script:', err);
  process.exit(1);
});
