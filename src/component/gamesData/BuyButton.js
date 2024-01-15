import React from "react";
import '../../App.css'

export function BuyButtonComponent() {
    // Paste the stripe-buy-button snippet in your React component
    return (
      <stripe-buy-button
      buy-button-id="buy_btn_1OMNWWC95mfbzVU0XHdJSLP0"
      publishable-key="pk_test_51OC4ySC95mfbzVU03AAFIDa2QzSbYny4GcYlmjDh9lvqsYHZEawrmr46fq8lUpO8QoaYuILvklft5CvLbaxFJxfx00nOvReOx3"
    >
    </stripe-buy-button>
    );
  }
  
export function BuyButton1000k(){
  return(
    <stripe-buy-button
  buy-button-id="buy_btn_1OXsNbC95mfbzVU0g9MsdMUw"
  publishable-key="pk_test_51OC4ySC95mfbzVU03AAFIDa2QzSbYny4GcYlmjDh9lvqsYHZEawrmr46fq8lUpO8QoaYuILvklft5CvLbaxFJxfx00nOvReOx3"
>
 </stripe-buy-button>
  )
}

export function BuyButton200k(){
  return(
    <stripe-buy-button
  buy-button-id="buy_btn_1OMX0fC95mfbzVU0kHlPfHF5"
  publishable-key="pk_test_51OC4ySC95mfbzVU03AAFIDa2QzSbYny4GcYlmjDh9lvqsYHZEawrmr46fq8lUpO8QoaYuILvklft5CvLbaxFJxfx00nOvReOx3"
>
</stripe-buy-button>
  )
}

  // export default BuyButtonComponent;