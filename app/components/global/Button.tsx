type Props = {
  variant: "white" | "black" | "signature"
  children: React.ReactNode,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function MyButton({
  variant,
  children,
  ...props
}: Props) {
  switch (variant) {
    case "white": return <button className="rounded-sm font-semibold py-2 px-8 border border-custom-black w-full rounded-sm mb-2 capitalize basic-animation hover:bg-black/10 focus:bg-black/20" {...props}>{children}</button>
    case "black": return <button className="rounded-sm font-semibold py-2 px-8 border border-custom-black bg-custom-black text-custom-white w-full rounded-sm mb-2 capitalize basic-animation hover:opacity-90 focus:opacity-80" {...props}>{children}</button>
    case "signature": return <button className="rounded-sm font-semibold py-2 px-8 border border-custom-signature-green bg-custom-signature-green text-custom-white w-full rounded-sm mb-2 capitalize basic-animation hover:opacity-90 focus:opacity-80" {...props}>{children}</button>
  }
};
