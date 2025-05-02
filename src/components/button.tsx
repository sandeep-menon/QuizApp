function Button({children, ...props}: {children: React.ReactNode} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className="px-4 py-2 border hover:ring-2 cursor-pointer">{children}</button>
    )
}

export default Button;