export type SupportedLanguage = {
    code: string
    name: string
}

export enum TranslateBoxType {
    FROM = 'FROM',
    TO = 'TO'
}

export interface TranslationResponse {
    responseData: {
      translatedText: string;
      match: number;
    };
    quotaFinished: boolean;
    mtLangSupported: string | null; // Puedes especificar un tipo más específico si conoces la estructura
    responseDetails: string;
    responseStatus: number;
    responderId: string | null; // Puedes especificar un tipo más específico si conoces la estructura
    exception_code: string | null;
    matches: Match[];
  }
  
  interface Match {
    id: string;
    segment: string;
    translation: string;
    source: string;
    target: string;
    quality: number;
    reference: string | null; // Puedes especificar un tipo más específico si conoces la estructura
    'usage-count': number; // Nota: la propiedad tiene un guion, por lo que se debe acceder con comillas
    subject: string;
    'created-by': string; // Nota: la propiedad tiene un guion, por lo que se debe acceder con comillas
    'last-updated-by': string; // Nota: la propiedad tiene un guion, por lo que se debe acceder con comillas
    'create-date': string; // Nota: la propiedad tiene un guion, por lo que se debe acceder con comillas
    'last-update-date': string; // Nota: la propiedad tiene un guion, por lo que se debe acceder con comillas
    match: number;
  }
  