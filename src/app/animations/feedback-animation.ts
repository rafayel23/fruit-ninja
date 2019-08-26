import { trigger, style, transition, animate } from '@angular/animations'


export const Feedback = [

    trigger('feedback', [
        transition(':enter', [
            style({ opacity: 0.5 , transform: 'translateY(10px) scale(0.8)'}),
            animate('0.1s', style({ opacity: 1 , transform: '*'})),
        ]),
        transition(':leave', [
            animate('0.1s', style({ opacity: 0.5 , transform: 'translateY(-10px) scale(0.9)'}))
        ])
    ]),
]
