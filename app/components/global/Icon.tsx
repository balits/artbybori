import clsx from "clsx";
import React from "react"
import {IconBaseProps} from "react-icons"
import { BiShoppingBag } from "react-icons/bi";
import { HiArrowLeft, HiCheck, HiFilter, HiMinus, HiPlus, HiSearch, HiX, HiXCircle } from "react-icons/hi";
import { HiBars2, HiBars3BottomLeft, HiListBullet, HiOutlineArrowPath } from "react-icons/hi2";

type IconProps = IconBaseProps & {
  className?: string,
  as?: React.ElementType,
  soft?: boolean
}

type WrapperProps = {
  children: React.ReactNode
}

function IconWrapper({
  className,
  children,
  as:Component = "span",
  soft = false,
  ...props
}: IconProps & WrapperProps) {
  return (
    <Component {...props} className={clsx("cursor-pointer  focus:ring-custom-signature-green", soft ? "text-custom-lightgrey hover:text-custom-grey" : "text-custom-grey hover:text-custom-black" , className)}>
      {children}
    </Component>
  )
}

export function SearchIcon(props: IconProps) {
  return <IconWrapper {...props}>
    <HiSearch />
  </IconWrapper>
}

export function ShoppingBag(props: IconProps) {
  return <IconWrapper {...props}>
    <BiShoppingBag />
  </IconWrapper>
}

export function Bars(props:IconProps) {
  return <IconWrapper {...props}>
    <HiBars2 />
  </IconWrapper>
}

export function X(props: IconProps) {
  return <IconWrapper {...props}>
    <HiX />
  </IconWrapper>
}

export function Minus(props: IconProps) {
  return <IconWrapper {...props}>
    <HiMinus />
  </IconWrapper>
}

export function Plus(props: IconProps) {
  return <IconWrapper {...props}>
    <HiPlus />
  </IconWrapper>
}

export function FilterIcon(props: IconProps) {
  return <IconWrapper {...props}>
    <HiBars3BottomLeft />
  </IconWrapper>
}

export function Check(props: IconProps) {
  return <IconWrapper {...props}>
    <HiCheck />
  </IconWrapper>
}

export function XCirlce(props: IconProps) {
  return <IconWrapper {...props}>
    <HiXCircle />
  </IconWrapper>
}

export function Filter(props: IconProps) {
  return <IconWrapper {...props}>
    <HiListBullet  className="w-6 h-6"/>
  </IconWrapper>
}

export function Spinner(props: IconProps) {
  return <IconWrapper {...props}>
    <HiOutlineArrowPath className="animate-spin" />
  </IconWrapper>
}

export function LeftArrow(props: IconProps) {
  return <IconWrapper {...props}>
    <HiArrowLeft />
  </IconWrapper>
}
