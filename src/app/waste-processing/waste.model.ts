export class Waste {
  constructor(afvalId: string, artikelId: string, metrage: string, categories: string) {
    this.afvalId = afvalId;
    this.artikelId = artikelId;
    this.metrage = metrage;
    this.categories = categories;
  }

  afvalId!: string;
  artikelId!: string;
  metrage!: string;
  categories!: string;
}
