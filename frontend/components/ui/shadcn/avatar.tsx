"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

type AvatarSize = "default" | "sm" | "lg" | "3xlg"

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: AvatarSize
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten",
        "data-[size=sm]:size-6",
        "data-[size=default]:size-8",
        "data-[size=lg]:size-10",
        "data-[size=3xlg]:size-28", // size-24 (96px) ya size-[100px]
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-(--secondryColor)/30 text-sm text-(--secondryColor)",
        "group-data-[size=sm]/avatar:text-xs",
        "group-data-[size=lg]/avatar:text-base",
        "group-data-[size=3xlg]/avatar:text-4xl font-bold", // 👈 3xlg Text Size Added
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        "group-data-[size=3xlg]/avatar:size-6 group-data-[size=3xlg]/avatar:ring-4 group-data-[size=3xlg]/avatar:[&>svg]:size-4", // 👈 3xlg Badge Size Added
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ 
  className, 
  size = "default",
  ...props 
}: React.ComponentProps<"div"> & { size?: AvatarSize }) {
  return (
    <div
      data-slot="avatar-group"
      data-size={size}
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        "data-[size=3xlg]:-space-x-6", // Large overlap for 3xlg
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-red-500 ring-2 ring-background [&>svg]:size-4",
        "group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        "group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5",
        "group-has-data-[size=3xlg]/avatar-group:size-24 group-has-data-[size=3xlg]/avatar-group:text-2xl group-has-data-[size=3xlg]/avatar-group:[&>svg]:size-8", // 👈 3xlg Group Count Added
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}