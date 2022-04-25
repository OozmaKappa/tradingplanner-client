import { Route } from '@angular/router';
import { FinanceComponent } from 'app/modules/admin/finance/finance.component';
import { FinanceResolver } from 'app/modules/admin/finance/finance.resolvers';
import { AnalyticsResolver } from '../analytics/analytics.resolvers';
import { PortfolioResolver } from '../portfolio/portfolio.resolver';
import { TradeResolver } from '../trade/trade.resolver';

export const financeRoutes: Route[] = [
    {
        path: '',
        component: FinanceComponent,
        resolve: {
            data: FinanceResolver, AnalyticsResolver, PortfolioResolver, TradeResolver
        },
    }
];
