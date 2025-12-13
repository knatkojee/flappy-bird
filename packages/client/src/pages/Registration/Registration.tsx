import { Button } from '@/components'
import { Input } from '@/components/common/Input/Input'
import { Label } from '@/components/common/Label/Label'
import { User, Mail, Lock } from '@/components/common/Icon/Icon'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import styles from './Registration.module.css'

const Registration = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement registration logic
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.birdIcon}>🐦</div>
            <h1 className={styles.title}>Join the Flock!</h1>
            <p className={styles.subtitle}>
              Create your account and start your flying adventure
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="username" className={styles.fieldLabel}>
                Username
              </Label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} />
                <Input
                  id="username"
                  type="text"
                  placeholder="flyingbird123"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  size="sm"
                  withIcon
                  required
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="email" className={styles.fieldLabel}>
                Email Address
              </Label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  size="sm"
                  withIcon
                  required
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="password" className={styles.fieldLabel}>
                Password
              </Label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  size="sm"
                  withIcon
                  required
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="passwordConfirm" className={styles.fieldLabel}>
                Confirm Password
              </Label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <Input
                  id="passwordConfirm"
                  type="password"
                  placeholder="••••••••"
                  value={passwordConfirm}
                  onChange={e => setPasswordConfirm(e.target.value)}
                  size="sm"
                  withIcon
                  required
                />
              </div>
            </div>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                required
              />
              <span className={styles.checkboxText}>
                I agree to the{' '}
                <Link to="#" className={styles.link}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className={styles.link}>
                  Privacy Policy
                </Link>
              </span>
            </label>

            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
              size="lg">
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <p className={styles.signInText}>
            Already have an account?{' '}
            <Link to={ROUTES.PUBLIC.LOGIN} className={styles.link}>
              Sign in here
            </Link>
          </p>
        </div>

        <div className={styles.additionalInfo}>
          <p className={styles.additionalInfoText}>
            Join thousands of players in the ultimate flying challenge.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registration
