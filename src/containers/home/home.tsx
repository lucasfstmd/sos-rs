import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { withRouter } from '../../components/with.router'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import MapPage from '../../components/map'
import { ApplicationState, AsyncStateStatus } from '../../store/root.types'
import { SosActions } from '../../store/sos'
import { connect } from 'react-redux'
import { ThemeMode } from '../../material.theme'
import { ISosAction } from '../../store/sos/types'
import { Sos } from '../../application/domain/models/entity/sos'

const LayoutStyle = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '100%',
        backgroundColor: theme.palette.background.default
    },
    containerMap: {
        width: '100vw',
        height: '98vh'
    }
})

interface IProps extends WithTranslation {
    readonly themeMode: ThemeMode
    readonly statusRequest: AsyncStateStatus
    readonly statusCreate: AsyncStateStatus
    readonly statusOne: AsyncStateStatus
    readonly dataRequest: Array<any>
    readonly dataCreate: Array<any>
    readonly dataOne: any

    sosRequest(): void

    sosCreateRequest(props: ISosAction): void

    sosOneRequest(props: ISosAction): void
}

type IJoinProps = IProps & WithStyles<typeof LayoutStyle>


class HomeComponent extends Component<IJoinProps> {

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: IJoinProps) {
        super(props)

        this.onCreate = this.onCreate.bind(this)
        this.onGetOne = this.onGetOne.bind(this)
    }

    /**
     * Method belonging to the component's life cycle, triggered immediately after a component is assembled (inserted in the tree).
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @return {void}
     */
    public componentDidMount() {
        const { t } = this.props
        this.props.sosRequest()
        document.title = `${t('HOME.HELMET')}`
    }
    /**
     * @public
     * @returns {React.ReactNode} Login screen for the user to authenticate to the system
     */
    public render() {
        const {
            dataRequest,
            dataOne,
            statusOne
        } = this.props

        return <React.Fragment>
            <MapPage
                poiters={dataRequest}
                onCreate={this.onCreate}
                onGetOne={this.onGetOne}
                dataOne={dataOne}
                statusOne={statusOne}
            />
        </React.Fragment>
    }

    private onCreate(sos: Sos) {
        this.props.sosCreateRequest({ payload: sos })
    }

    private onGetOne(id: number) {
        this.props.sosOneRequest({ id: id })
    }

}


const HomeWithTransaltion = withTranslation()(HomeComponent)

const HomeWithStyles = withStyles<any>(LayoutStyle)(HomeWithTransaltion)

const Home = withRouter((HomeWithStyles))

const mapStateToProps = (state: ApplicationState) => ({
    themeMode: state.layout.themeMode,
    statusRequest: state.sos.request.status,
    dataRequest: state.sos.request.data,
    statusCreate: state.sos.create.status,
    dataCreate: state.sos.create.data,
    statusOne: state.sos.getOne.status,
    dataOne: state.sos.getOne.data
})

const mapActionsToProps = {
    ...SosActions
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Home))
