import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkoutFn, isCheckingOut } = useCheckout()

  return (
    <button
      disabled={isCheckingOut}
      onClick={() => checkoutFn(bookingId)}
      className='rounded-lg text-center px-2 py-1 -text--color-brand-50 -bg--color-brand-600 hover:-bg--color-brand-700'>
      {isCheckingOut ? <SpinnerMini /> : 'Check out'}
    </button>
  );
}

export default CheckoutButton;
