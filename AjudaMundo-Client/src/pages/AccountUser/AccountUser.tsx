import { ReactNode, useContext } from 'react'

import DefaultProfileImage from '../../assets/imgs/default_profile_image.jpg'
import { AuthContext } from '../../contexts'

import {
  Container,
  WrapperProfileInfo,
  ProfileImage,
  LabelOngName,
  LabelOngEmail,
  ButtonLogout,
} from './AccountUser.styles'

export const AccountUser = () => {
  const { user, signOut } = useContext(AuthContext)

  if (!user) {
    signOut()
    return <></> 
  }

  return (
    <Container>
      <WrapperProfileInfo>
        <ProfileImage
          style={{
            backgroundImage: `url(${
              user.profileImg ? user.profileImg : DefaultProfileImage
            })`,
          }}
        />
        <LabelOngName>{user.name}</LabelOngName>
        <LabelOngEmail>{user.email}</LabelOngEmail>
        <ButtonLogout type={'button'} onClick={() => signOut()}>
          Sair da conta
        </ButtonLogout>
      </WrapperProfileInfo>
    </Container>
  )
}
