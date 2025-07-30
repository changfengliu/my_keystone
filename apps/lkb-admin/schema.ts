import { User } from './schema/account/User'
import Shop from './schema/company/Shop'
import Article from './schema/Article'
import Tag from './schema/Tag'
import { Service } from './schema/company/Service'
import { ServiceCategory } from './schema/company/ServiceCategory'
import { CardType } from './schema/membership/CardType'
import { MembershipCard } from './schema/membership/MembershipCard'
import { CardConsumptionRecord } from './schema/membership/CardConsumptionRecord'
import { ProductCategory } from './schema/mall/ProductCategory'
import { Product } from './schema/mall/Product'
import { Cart } from './schema/mall/Cart'
import { CartItem } from './schema/mall/CartItem'
import { Employee } from './schema/company/Employee'
import { Image } from './schema/assets/Image'
import { Album } from './schema/assets/Album'
import { Menu } from './schema/admin/Menu'
import { App } from './schema/admin/App'
import { WechatUser } from './schema/weichat/WechatUser'

//------------------------------------------

const membershipLists = { CardType, MembershipCard, CardConsumptionRecord }
const companyLists = { Service, ServiceCategory, Employee, Shop }
const mallLists = { ProductCategory, Product, Cart, CartItem }
const imageLists = { Image, Album }
const adminLists = { Menu, App }

//------------------------------------------

export const lists = {
  User,
  Article,
  Tag,
  ...adminLists,
  WechatUser,
  ...mallLists,
  ...companyLists,
  ...membershipLists,
  ...imageLists,
}
