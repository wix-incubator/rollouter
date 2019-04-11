export class User {
  constructor(private id: string, private labels: UserLabels = {}) {

  }
  getRaw(): UserData{
    return {
      id: this.id,
      labels: this.labels,
    }
  }

  getLabels(): UserLabels {
    return this.labels;
  }

  getId(): string{
    return this.id;
  }
}

export type UserLabels = {[key: string]: number | string | boolean};
export type UserData = {id: string, labels: UserLabels};
