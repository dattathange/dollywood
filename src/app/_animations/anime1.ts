// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style, group, animateChild, query, stagger } from '@angular/animations';

export const fadeInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [

        // route 'enter' transition
        transition(':enter', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.4s', style({ opacity: 1 }))
        ]),
        transition(':leave', [
            // animation and styles at end of transition
            animate('.5s ease-in', style({
                
            }))
        ])
    ]);

export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', [

        query(':enter, :leave', style({ position: 'fixed', width: '100%' })
            , { optional: true }),
        group([  // block executes in parallel
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
                ], { optional: true })
        ])
    ])
]);
