import {PerspectiveCamera, Group} from 'three'

export const cameraPivot = new Group()
export const camera = new PerspectiveCamera(
  50,                                     /* FOV */
  window.innerWidth / window.innerHeight, /* Aspect ratio */
  0.1,                                    /* Near clip */
  700.0                                   /* Far clip */
)

cameraPivot.matrixAutoUpdate = false
camera.matrixAutoUpdate = false

cameraPivot.add(camera)
