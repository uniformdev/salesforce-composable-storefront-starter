import {DefaultNotImplementedComponent} from '@uniformdev/canvas-react'
import ProductRail from './product-rail'
import CallToActionImage from './CallToAction/CallToActionImage'
import CallToActionCentered from './CallToAction/CallToActionCentered'
import HeroFeatures, {HeroFeature} from './hero-features'
import Features, {Feature} from './features'
import PlpHeaderDesktop from './plp-header'
import PlpHeaderMobile from './plp-header/mobile'
import NavGroupSimple from './list-menu/nav-group-simple'
import NavSectionSimple from './list-menu/nav-section-simple'
import NavItemSimple from './list-menu/nav-item-simple'
import PlpRefinements from './plp-refinements'
import PlpListing from './plp-listing'
import PlpFooter from './plp-footer'
import PlpNoResults from './plp-no-results'
import PdpProductView from './pdp-product-view'
import PdpProductInformation from './pdp-product-information'
import PdpRecommendedProducts from './pdp-recommended-products'

const components = {
    callToAction: CallToActionImage,
    callToActionDefault: CallToActionImage,
    callToActionCentered: CallToActionCentered,
    callToActionImage: CallToActionImage,
    dynamicProductList: ProductRail,
    feature: Feature,
    features: Features,
    heroFeature: HeroFeature,
    heroFeatures: HeroFeatures,
    navGroupSimple: NavGroupSimple,
    navItemSimple: NavItemSimple,
    navSectionSimple: NavSectionSimple,
    pdpProductInformation: PdpProductInformation,
    pdpProductView: PdpProductView,
    pdpRecommendedProducts: PdpRecommendedProducts,
    plpFooter: PlpFooter,
    plpHeader: PlpHeaderDesktop,
    plpHeaderDesktop: PlpHeaderDesktop,
    plpHeaderMobile: PlpHeaderMobile,
    plpListing: PlpListing,
    plpNoResults: PlpNoResults,
    plpRefinements: PlpRefinements,
    productRail: ProductRail,
    productRecommendations: ProductRail
}

export function resolveRenderer(component) {
    const variant = component.variant
    const componentName = variant
        ? `${component.type}${capitalizeFirstLetter(variant)}`
        : component.type
    const componentImpl = components[componentName]

    return componentImpl ? componentImpl : DefaultNotImplementedComponent
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export default resolveRenderer
