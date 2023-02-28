export interface IRequestAnswer {
  quotes: {
    RUBCNY: number;
    RUBEUR: number;
    RUBGBR: number;
    RUBJPY: number;
    RUBTRY: number;
    RUBUSD: number;
  };
  source: string;
  success: boolean;
  timestamp: number;
}
