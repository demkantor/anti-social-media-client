
export default {
  // main color scheme
    palette: {
      primary: {
        light: '#ab96b1',
        main: '#8E7C93',
        dark: '#36435e',
        contrastText: '#fffff1'
      },
      secondary: {
        light: '#ff6333',
        main: '#51368D',
        dark: '#34205f',
        contrastText: '#fffff1'
      }
    },
    
    // component styles
    componentThemes:{
      typography: {
        useNextVariants: true
      },
      form: {
        textAlign: 'center'
      },
      image: {
        margin: '20px auto 20px auto'
      },
      pageTitle: {
        margin: '10px auto 10px auto'
      },
      textField: {
        margin: '10px auto 10px auto'
      },
      button: {
        marginTop: 20,
        position: 'relative'
      },
      customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
      },
      progress: {
        position: 'absolute'
      },
      invisibleSeperator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#51368D'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      },
      deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
      },
      card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
      },
      disImage: {
          minWidth: 200,
      },
      content: {
          padding: 25,
          objectFit: 'cover',
      },
      submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
      },
      closeButton: {
        position: 'absolute',
        left: '90%',
        top: '5%'
      },
      profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
      },
      dialogContent: {
        padding: 20
      },
      expandButton: {
        position: 'absolute',
        left: '90%'
      },
      spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
      },
      commentImage: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%',
        padding: 10,
        marginLeft: 10,
      },
      commentData: {
        marginLeft: 15,
        marginTop: 15
      },
      fullLine: {
        height: 15,
        width: '90%',
        backgroundColor: 'rgba(0,0,0, 0.6)',
        marginBottom: 10
      },
      halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0, 0.6)',
        marginBottom: 10
      }
  }
};