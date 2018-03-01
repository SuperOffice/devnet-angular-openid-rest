import { Component, OnInit } from '@angular/core';
import { AuthService, Claims } from '../services/auth.service';
import { SaleService } from '../services/sale.service';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  private errorMessage;
  private sales;
  private claims;

  constructor(private saleSvc: SaleService, private authService: AuthService) { }

  ngOnInit() {
    this.claims = this.authService.getClaims();

    this.saleSvc.getAllSales()
    .subscribe( saleData => {
      this.sales = saleData;
    }, error => {
      this.errorMessage = error;
    });
  }

}
