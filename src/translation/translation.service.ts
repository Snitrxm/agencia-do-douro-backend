import { Injectable, Logger } from '@nestjs/common';
import * as deepl from 'deepl-node';

@Injectable()
export class TranslationService {
  private readonly logger = new Logger(TranslationService.name);
  private translator: deepl.Translator;

  constructor() {
    const apiKey = process.env.DEEPL_API_KEY;
    if (!apiKey) {
      this.logger.warn(
        'DEEPL_API_KEY not found in environment variables. Translation service will not work.',
      );
    }
    this.translator = new deepl.Translator(apiKey || '');
  }

  /**
   * Translate text from Portuguese to target language using DeepL
   * @param text Text to translate
   * @param targetLang Target language code ('en-GB' or 'fr')
   * @returns Translated text or empty string if translation fails
   */
  async translate(
    text: string | null | undefined,
    targetLang: 'en-GB' | 'fr',
  ): Promise<string> {
    if (!text || text.trim() === '') {
      return '';
    }

    if (!process.env.DEEPL_API_KEY) {
      this.logger.warn('Translation skipped: DEEPL_API_KEY not configured');
      return '';
    }

    try {
      const result = await this.translator.translateText(
        text,
        'pt',
        targetLang,
      );
      return (result as deepl.TextResult).text;
    } catch (error) {
      this.logger.error(
        `Translation error for target language ${targetLang}:`,
        error,
      );
      return '';
    }
  }

  /**
   * Translate multiple texts from Portuguese to target language
   * @param texts Array of texts to translate
   * @param targetLang Target language code ('en-GB' or 'fr')
   * @returns Array of translated texts
   */
  async translateBatch(
    texts: string[],
    targetLang: 'en-GB' | 'fr',
  ): Promise<string[]> {
    if (!texts || texts.length === 0) {
      return [];
    }

    if (!process.env.DEEPL_API_KEY) {
      this.logger.warn('Translation skipped: DEEPL_API_KEY not configured');
      return texts.map(() => '');
    }

    try {
      const results = await this.translator.translateText(
        texts,
        'pt',
        targetLang,
      );
      return Array.isArray(results)
        ? results.map((r) => (r as deepl.TextResult).text)
        : [(results as deepl.TextResult).text];
    } catch (error) {
      this.logger.error(
        `Batch translation error for target language ${targetLang}:`,
        error,
      );
      return texts.map(() => '');
    }
  }
}
