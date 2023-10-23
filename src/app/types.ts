//post(page.tsx 38行)がany型になっちゃうのでtsで型定義！

export type PostType = {
    id: number;
    title: string;
    description: string;
    date: Date;
};