import { Component } from '@angular/core';
import { ReviewsComponent } from "../../shared/components/reviews/reviews.component";

@Component({
  selector: 'app-happy-opinions',
  standalone: true,
  imports: [ReviewsComponent],
  templateUrl: './happy-opinions.component.html',
  styleUrl: './happy-opinions.component.css'
})
export class HappyOpinionsComponent {

}
