import { useHistory } from 'react-router-dom'

import logo from '../../assets/images/logo.svg'
import twitterLogo from '../../assets/images/twitter-logo.svg'
import illustration from '../../assets/images/illustration.svg'

import { Button } from '../../components/Button/Button'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import './Home.scss'

export function Home() {
  const history = useHistory()
  const { user, signInWithTwitter } = useContext(AuthContext)

  async function navigateSignInAndRedirectToSearchHashtag() {
    if (!user) {
      await signInWithTwitter()
    }

    history.push('/SearchHashtag')
  }

  return (
    <div id="page-auth">
      <main>
        <img src={logo} alt="hashtagr" />
        <strong>Monitore campanhas de marketing pelo mundo</strong>
        <p>Entre com a sua conta do Twitter e comece a buscar</p>
        <Button type="submit" onClick={navigateSignInAndRedirectToSearchHashtag}>
          <img src={twitterLogo} alt="Logo do Twitter" />
          Login
        </Button>
      </main>
      <aside>
        <img src={illustration} alt="Ilustração hashtagr" />
      </aside>
    </div>
  )
}