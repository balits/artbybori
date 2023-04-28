import { Button, ButtonProps } from "../ui";


export default function CheckoutButton({
  variant: buttonVariant,
  children,
  variantId,
}: {
  varaintId: Array<string>
} & ButtonProps) {
  return (
    <Button variant={buttonVariant}>
      {children ?? "Checkout"}
    </Button>
  )
}
