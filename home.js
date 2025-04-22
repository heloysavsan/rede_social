'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form')
    const signupForm = document.querySelector('.signup-form')
    const togglePassword = document.querySelector('.toggle-password')
    const fbLoginBtn = document.querySelector('.fb-login')
    const forgotPasswordLink = document.querySelector('.forgot-password')

    const setupPasswordToggle = () => {
        const passwordInput = document.querySelector('#password')
        const toggleBtn = document.querySelector('.toggle-password')
        
        if (toggleBtn && passwordInput) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault()
                const isPassword = passwordInput.type === 'password'
                passwordInput.type = isPassword ? 'text' : 'password'
                toggleBtn.textContent = isPassword ? 'Ocultar' : 'Mostrar'
            })
        }
    }

    const handleLogin = async (credentials) => {
        try {
            const response = await fetch('https://back-spider.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Erro ao fazer login')
            }

            const data = await response.json()

            localStorage.setItem('user', JSON.stringify(data.user))
            window.location.href = '/feed.html'
            
        } catch (error) {
            console.error('Erro no login:', error)
            alert(error.message || 'Erro ao conectar com o servidor')
        }
    }


    const handleSignup = async (userData) => {
        try {
            const response = await fetch('https://back-spider.vercel.app/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Erro ao cadastrar')
            }

            alert('Cadastro realizado com sucesso! Faça login para continuar.')
            window.location.href = '/login.html'
            
        } catch (error) {
            console.error('Erro no cadastro:', error)
            alert(error.message || 'Erro ao cadastrar usuário')
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            
            const submitButton = loginForm.querySelector('button[type="submit"]')
            submitButton.disabled = true
            submitButton.textContent = 'Entrando...'
            
            const credentials = {
                email: loginForm.querySelector('#username').value,
                password: loginForm.querySelector('#password').value
            }

            await handleLogin(credentials)
            
            submitButton.disabled = false
            submitButton.textContent = 'Entrar'
        })
    }


    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            
            const submitButton = signupForm.querySelector('button[type="submit"]')
            submitButton.disabled = true
            submitButton.textContent = 'Criando...'
            
            const userData = {
                email: signupForm.querySelector('#email').value,
                username: signupForm.querySelector('#username').value,
                password: signupForm.querySelector('#password').value
            }

            await handleSignup(userData)
            
            submitButton.disabled = false
            submitButton.textContent = 'Criar conta'
        })
    }

    if (fbLoginBtn) {
        fbLoginBtn.addEventListener('click', (e) => {
            e.preventDefault()
            alert('Redirecionando para login com Facebook...')

        })
    }


    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault()
            const email = prompt('Digite seu e-mail para redefinir a senha:')
            if (email) {
                alert(`Link de redefinição enviado para ${email}`)
            }
        })
    }

    if (localStorage.getItem('authToken')) {
        window.location.href = '/feed.html'
    }

    setupPasswordToggle()
})