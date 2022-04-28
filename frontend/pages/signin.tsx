import type { NextPage } from 'next'
import Card from '../components/Card'
import styles from '../styles/Home.module.css'
import { Input, Button, Link } from '@nextui-org/react'
import { Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

const Home: NextPage = () => {

  const router = useRouter()

  const [disappear, setDisappear] = useState(false)

  const toSignUp = useCallback(() => {
    setDisappear(true)
    setTimeout(() => {
        router.push('signup')
    }, 300)
}, [router])

  return (
    <div className={styles.container}>
      <Card disappear={disappear}>
        <div style={{
          textAlign: 'center'
        }}>
          <img src="/logo.jpg" alt="logo.jpg" className={styles.img} />
          <h2 className={styles.title}>Instify</h2>
        </div>
        <br />

        {/* email input */}
        <div style={{
          marginBottom: '10px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Input
            label="Email"
            placeholder='Email'
          ></Input>
        </div>


        {/* password input */}
        <div style={{
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Input.Password
            label="Password"
            placeholder='Password'
          ></Input.Password>
        </div>

        <div style={{marginBottom: '10px'}}>
          <Text>Don't have an account? <Link
            onClick={toSignUp}
          >Create new account</Link> </Text>
        </div>

        <div className={styles.bottom}>
          <Button>
            Sign In
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Home
