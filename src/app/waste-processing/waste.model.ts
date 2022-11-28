export class Waste {
  constructor(afvalId: number, artikelId: number, metrage: number, categories: string) {
    this.afvalId = afvalId;
    this.artikelId = artikelId;
    this.metrage = metrage;
    this.categories = categories;
  }

  afvalId!: number;
  artikelId!: number;
  metrage!: number;
  categories!: string;
}
