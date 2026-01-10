import React, { createContext, useState, useCallback } from 'react'

export const ToastContext = createContext({ showSuccess: () => { }, showError: () => { } })

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((type, message) => {
        const id = Date.now() + Math.random()
        setToasts((t) => [...t, { id, type, message }])
        setTimeout(() => {
            setToasts((t) => t.filter((x) => x.id !== id))
        }, 4000)
    }, [])

    const showSuccess = (message) => addToast('success', message)
    const showError = (message) => addToast('error', message)

    return (
        <ToastContext.Provider value={{ showSuccess, showError }}>
            {children}
            <div style={{ position: 'fixed', right: 20, top: 20, zIndex: 9999 }}>
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        style={{
                            marginBottom: 8,
                            padding: '10px 14px',
                            borderRadius: 8,
                            color: '#fff',
                            minWidth: 200,
                            boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                            background: t.type === 'success' ? '#16a34a' : '#dc2626',
                        }}
                    >
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export default ToastProvider
