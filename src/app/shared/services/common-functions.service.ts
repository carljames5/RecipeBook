export class CommonFunctionsService {
  public generateRandomAmount(minValue: number, maxValue: number): number {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + 1;
  }

  public wordCapitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
}
