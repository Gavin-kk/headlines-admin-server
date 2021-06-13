import { HttpService, Injectable, Logger } from '@nestjs/common';
@Injectable()
export class AuthService {
  public logger = new Logger('auth.service');

  constructor(private readonly httpService: HttpService) {}

  async getVerificationCode(phone: number) {
    try {
      const result = await this.httpService
        .get(`/captchas/${phone}`)
        .toPromise();
      return result.data;
    } catch (err) {
      this.logger.log(err);
    }
  }

  async getSMSVerificationCode(phone: number) {
    try {
      const result = await this.httpService
        .get(`/sms/codes/${phone}`)
        .toPromise();
      return result.data;
    } catch (error) {
      this.logger.log(error);
    }
  }
}
