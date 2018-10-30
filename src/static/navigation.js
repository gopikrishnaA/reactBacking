import appLogo from './images/DBS_logo.png'
import store from '../store'
import {doLogout} from '../models/auth'
// import CustomLink from '../components/CustomLink'
// { type: 'custom', component: CustomLink, label: 'Custom', to: '/custom' },

// import { faFolderOpen, faHome, faMedkit, faEdit, faDollarSign, faGem } from 'fa5-pro-light'
import { faUser, faHistory, faChartBar, faUniversity, faSitemap } from '@fortawesome/free-solid-svg-icons'
const navigation = {
  appLogoLink: {
    appLogo: appLogo,
    label: 'Connect',
    to: '/remittance/customerDetails'
  },
  userNavLinks: [{ label: 'LogOut', to: '/login', onClickListner: () => store.dispatch(doLogout()) }],
  sideNavLinks: [
    {
      type: 'nested',
      label: 'Remittance Transaction',
      id: 'remittanceTransaction',
      nestedLinks: [
        { label: 'Customer Details', to: '/remittance/customerDetails', icon: faUser },
        { label: 'Transaction Enquiry', to: '/remittance/transactionEnquiry', icon: faHistory },
        { label: 'SmartSend Audit', to: '/remittance/smartSendAudit', icon: faChartBar }
      ]
    }
    // {
    //   type: 'nested',
    //   label: 'MGM Remittance Reward',
    //   id: 'remittanceReward',
    //   nestedLinks: [
    //     { label: 'Compaigns', to: '/remittance/compaigns', icon: faUniversity },
    //     { label: 'Reports', to: '/remittance/reports', icon: faSitemap }
    //   ]
    // }
  ],
  connectNavLinks: [{ label: 'Connect 1' }, { label: 'Connect 2' }, { label: 'Connect 3' }]
}

export default navigation
