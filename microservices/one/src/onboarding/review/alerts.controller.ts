import { Body, Controller, Post } from '@nestjs/common';

@Controller('onboarding/review/alerts')
export class AlertsController {
  @Post()
  create(@Body() body: any) {
    const alerts = [];
    for (let i = 0; i < body.alerts.length; i += 1) {
      alerts.push({ id: i + 1, title: body.alerts[i].title });
    }
    return { alerts };
  }
}
