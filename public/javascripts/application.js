const toggleButtonUI = (button, forward = false)=>{
  if (button)
  {
    if (forward){
      button.classList.add('is-loading')
      button.disabled = true
    } else {
      button.classList.remove('is-loading')
      button.disabled = false
    }
  }
}
const submitForm = async (url, form, submitButton, callback)=>{
  toggleButtonUI(submitButton, true)
  let data = new FormData(form)
  console.log('here');
  if (data.has('password')){
    let hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data.get('password')))
    data.set(
      'password', 
      new TextDecoder().decode(hash)
    )
    if (data.has('rpw'))
      data.delete('rpw')
  }
  axios
    .post(url, ((url.includes("/student") && !url.includes("/student/signup") && !url.includes("/student/login")) || url.includes("/ngo/signup"))? data: Object.fromEntries(data.entries()))
    .then((res)=>{
      console.log("gere", res)
      callback(res.data.status, res.data.reason)
      toggleButtonUI(submitButton, false)
    })
    .catch((err)=>{
      callback(false, err)
      toggleButtonUI(submitButton, false)
    })
}

const equalValidator = function (cross){
  this.addEventListener('change', ()=>{
    console.log('here', this.value, cross.value)
    if (this.value != cross.value){
      this.setCustomValidity('gibrish')
    } else {
      this.setCustomValidity('')
    }
  })
}

const tabs = (container, switches, contents)=>{
  Array.of(...document.getElementsByTagName('li')).forEach()
}


const signup = (e)=>{
  console.log(document.signup)
  e.preventDefault()
  submitForm(
    '/student/signup',
    document.signup,
    document.signup.button,
    (err, data)=>{
      if (! err){
        alert('Your Application is Submitted Successfully. You will get an Email from us shortly.')
        window.location = '/'
      }
      else {
        let reason;
        switch (res.reason){
          case 'dup':
            reason = 'Already Existing CNIC'
            break
          case 'read':
            reason = 'Read Error on Server'
            break
          case 'write':
            reason = 'Write Error on Server'
            break
          default:
            reason = 'Unknown Reason'
        }
        alert('Some Error Occured because of '+reason+'. Try Again!')
      }
    }
  )
  return false
}

if (document.signup){
  //document.signup.onsubmit = signup
}