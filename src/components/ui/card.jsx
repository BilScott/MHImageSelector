import { AlignCenter } from "lucide-react"
import * as React from "react"
 
const Card = React.forwardRef(({ className, ...props }, ref) => (
    <div>
        <h1>How are you feeling today?</h1>
        <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
    </div>
))
Card.displayName = "Card"
 
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"
 
export { Card, CardContent }