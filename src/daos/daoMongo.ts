import ContainerMongo from '../container/controller'
import chatModel from '../model/chatModel'
import {desnormalizar,normalizar} from '../utils/normalizr'

class chatDaoMongo extends ContainerMongo{

  constructor() {
    super(chatModel); 
  }
}

export default chatDaoMongo;