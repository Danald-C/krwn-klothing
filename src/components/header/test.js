import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore = firebase.firestore()

firestore.collection('users').doc('02071631_u').collection('cartItems').doc('02071634_ctI')
firestore.doc('/users/02071631_u/cartItems/02071634_ctI') // Chain till docs
firestore.collection('/users/02071631_u/cartItems') // Chain till collection