import * as React from 'react';
import styles from './MgtLogin.module.scss';
import type { IMgtLoginProps } from './IMgtLoginProps';
import { Login, MgtTemplateProps } from '@microsoft/mgt-react';
import { IconButton } from '@fluentui/react';

export default class MgtLogin extends React.Component<IMgtLoginProps, {}> {
  public render(): React.ReactElement<IMgtLoginProps> {
    return (
      <section className={styles.mgtLogin}>
        <div className={styles.welcome}>
          MGT Login
        </div>
        <div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Minimal usage</span>
            </h4>
            <Login />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Show presence</span>
            </h4>
            <Login showPresence={true} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Avatar display</span>
            </h4>
            <Login loginView='avatar' />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Compact display</span>
            </h4>
            <Login loginView='compact' />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Full display</span>
            </h4>
            <Login loginView='full' />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Custom data</span>
            </h4>
            {/* userDetails is of type IDynamicPerson which is a container interface
                that can allow access to the properties of the following interfaces:
                - MicrosoftGraph.User
                - MicrosoftGraph.Person
                - MicrosoftGraph.Contact
                - MicrosoftGraph.Group
            */}
            <Login
              userDetails={{
                  displayName: 'I\'m a ninja!',
                  department: 'Ninja Department',
                  personImage: this._ninjaUserImage
                }} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Full customization</span>
            </h4>
            <Login>
              <this.LoginTemplate template="signed-in-button-content" />
              <this.LoginTemplate template="signed-out-button-content" />
              <this.LoginTemplate template="flyout-commands" />
              <this.LoginTemplate template="flyout-person-details" />
            </Login>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Customized flyout commands</span>
            </h4>
            <Login>
              <this.LoginTemplate template="flyout-commands" />
            </Login>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Login events</span>
            </h4>
            <Login 
              loginInitiated={(e: CustomEvent<undefined>): void => {
                console.log('Login initiated');
              }}
              loginCompleted={(e: CustomEvent<undefined>): void => {
                console.log('Login completed');
              }}
              loginFailed={(e: CustomEvent<undefined>): void => {
                console.log('Login failed');
              }}
              logoutInitiated={(e: CustomEvent<undefined>): void => {
                console.log('Logout initiated');
              }}
              logoutCompleted={(e: CustomEvent<undefined>): void => {
                console.log('Logout completed');
              }}
            />
          </div>
        </div>
      </section>
    );
  }

  private LoginTemplate(props: MgtTemplateProps): JSX.Element {
    switch (props.template) {
      case 'signed-in-button-content':
        return (
          <div>
            Check My infos
            <IconButton iconProps={{ iconName: 'SignOut' }} onClick={() => props.dataContext.logoutInitiated?.(undefined)} />
          </div>
        );
      case 'signed-out-button-content':
        return (
          <IconButton iconProps={{ iconName: 'SignIn' }} onClick={() => props.dataContext.loginInitiated?.(undefined)} text='SignIn' />
        );
      case 'flyout-commands':
        return (
          <div className={styles.customFlyoutCommands}>
            <IconButton iconProps={{ iconName: 'AddFriend' }} onClick={() => alert('Add Friend')} text='Add Friend' />
            <IconButton iconProps={{ iconName: 'Mail' }} onClick={() => alert('Send Message')} text='Send Message' />
          </div>
        );
      case 'flyout-person-details':
        console.log(props.dataContext);
        return (
          <div className={styles.userFlyout}>
            <div className={styles.personBlockImage}>
              <img src={props.dataContext.personImage} alt="User" className={styles.userPicture} />
            </div>
            <div className={styles.personBlockDetails}>
              <div>
                {props.dataContext.personDetails?.displayName}
              </div>
              <div>
                {props.dataContext.personDetails?.jobTitle}
              </div>
              <div>
                {props.dataContext.personDetails?.officeLocation}
              </div>
            </div>
          </div>
        );
    }

    return <></>;
  }

  private _ninjaUserImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEG0lEQVRogc1ZXUgUURQetT/K6GfbdZ1dXbEtSyKIfUgherIeCiqQCqICiyAq80EpoohAiIgKg8oSC5KICCMsKInCh6AIKZ+kKLQ/+7OSQCsjy76zXevudUZ3Zs7s7oGPgbl3vvOd+3vuHU1zx9J0XV/g9/vX41mZnZ19FKgGyvGu1Ov1+l3y68yysrLmQWQt8BrCB0fAL9R5AOzOz8+fkmzdms/ny4eoCyRsFOHDgCA+AbtCodCEpIgPBALLIeCLVeEGgbShB/MSKh6O9wK/nYqX0I0GKUqIeLTYZkbhMUMKQcxyVTwclQA/3QhABPHEtcldWFg4Dg6euiVeCuKwKwGAvNJt8SKAH8FgMMytPwPk7w0ctsLhWTzP2EA9cFc3WAzAeYJVPXbRxYoDWj7XcHBj4i4E31uF/w2K0jn4owbSGtkBnG5kI9f+LQ5qTxSzOUCL3JOIO9iIJRPDSe6FCjZypYtvqOXYSX2o042yfmCtiUAa98+BFSbldUoP1LAFALJeqWWa1HK8a5AcvzP4vlgq7zTyAY6TSg+cYwsAZD0jBYBJflUq7zH4fokkrjvOAE6xBQDCxxL5TbUcWel8vB+AU5rg1Wp5JBIZS2m0+L7KxEe9EsABzgAaJeIuzWCJw06dmZeXFxqBJh3fzhjBR6uy0q3m0D5EXqZMsDI2ci06fJaquzHOCVPZHIDUo0tJHBx8B3ZqDJsNeFbKc0ygmUF2rMnDSArkFXAduGwDTcAzg/RkkGuXj7GcnJyZcNhv4pAzmbsPd2mWBWIzmjRaHZAfcTmAAVsnM3y4X/97Y9BGLW1WTyyHt11s/XLL4kUAcqr8EUSLzOoiV5+u7AtcOG5LPBkEH1Naoh+764ZRgmjmGjZ0T6TZGfeSpRGJPvx+h1rFbKnMoN0S+OZAfAdQ4kR4jNHuZyCoEe8mmn2DngoBzagzYEF4H3zVFhQUTGYTLwVRpMyJ6OUT3gflehQUyqqAlw564IP+dwHxcAcRhMBHShBdQITK6fI2jntQK6vPZ2CLxnmM9Hq9mSC9pna9cjrjxi3u3qDbiEMuCjac2OjhuZxB0JDZR7l+ooIQR9jZLOLppwTIOhPcC9FEEQelLKf608W4TKh4KYgWaMiwrV5sbkkRLwWxx5Z4WkpB0JfsAEgDUpeAndY/nQLih2At0RMXVU5yHG58zc3NnWal9XekgGgV260EcCcFBMfA6ELNzMak2PAh9GJRWRaXevpviw8epoDooZZvAebEPXyEUQ60jTLQJIqnnKjUqvAYC4fD40G0FWhPoPB2+pVLvh2JV40O+iBvoFs5F4YJzbkrYpw7OhuPauJAvwlOz+P5woFwOsldBM86j8fDf7SM1+hMLM7SFeLii/7E1Inrw0v6/7+SB+k+FVhlKzVQ7A9nE5ZWdva4IgAAAABJRU5ErkJggg==";
}
