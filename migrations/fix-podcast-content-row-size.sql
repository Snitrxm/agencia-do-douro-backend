-- Script para corrigir o erro "Row size too large" na tabela podcast_content
-- Converte colunas VARCHAR para TEXT para reduzir o tamanho da linha

-- Títulos e subtítulos
ALTER TABLE podcast_content MODIFY COLUMN pageTitle_pt TEXT NOT NULL;
ALTER TABLE podcast_content MODIFY COLUMN pageTitle_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN pageTitle_fr TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN pageSubtitle_pt TEXT NOT NULL;
ALTER TABLE podcast_content MODIFY COLUMN pageSubtitle_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN pageSubtitle_fr TEXT NULL;

-- About section
ALTER TABLE podcast_content MODIFY COLUMN aboutTitle_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN aboutTitle_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN aboutTitle_fr TEXT NULL;

-- Episode URLs and titles
ALTER TABLE podcast_content MODIFY COLUMN episode1Url TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode1Title_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode1Title_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode1Title_fr TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode2Url TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode2Title_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode2Title_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode2Title_fr TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode3Url TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode3Title_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode3Title_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode3Title_fr TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode4Url TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode4Title_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode4Title_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode4Title_fr TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode5Url TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode5Title_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode5Title_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode5Title_fr TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode6Url TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode6Title_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode6Title_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN episode6Title_fr TEXT NULL;

-- Host section
ALTER TABLE podcast_content MODIFY COLUMN hostName TEXT NOT NULL;
ALTER TABLE podcast_content MODIFY COLUMN hostCredential_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN hostCredential_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN hostCredential_fr TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN hostLinkedInUrl TEXT NULL;

-- Guests section
ALTER TABLE podcast_content MODIFY COLUMN guestsTitle_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN guestsTitle_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN guestsTitle_fr TEXT NULL;

-- Gallery section
ALTER TABLE podcast_content MODIFY COLUMN galleryTitle_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN galleryTitle_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN galleryTitle_fr TEXT NULL;

-- WhyListen section
ALTER TABLE podcast_content MODIFY COLUMN whyListenTitle_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN whyListenTitle_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN whyListenTitle_fr TEXT NULL;

-- Testimonials section
ALTER TABLE podcast_content MODIFY COLUMN testimonialsTitle_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN testimonialsTitle_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN testimonialsTitle_fr TEXT NULL;

-- CTA section
ALTER TABLE podcast_content MODIFY COLUMN ctaTitle_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN ctaTitle_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN ctaTitle_fr TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN ctaHint_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN ctaHint_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN ctaHint_fr TEXT NULL;

-- Platforms section
ALTER TABLE podcast_content MODIFY COLUMN platformsTitle_pt TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN platformsTitle_en TEXT NULL;
ALTER TABLE podcast_content MODIFY COLUMN platformsTitle_fr TEXT NULL;

-- Após executar este script, reinicie o backend para que o TypeORM adicione as novas colunas
