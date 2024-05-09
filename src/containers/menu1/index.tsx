import React, { Component } from 'react'
import {
    Box,
    Chip,
    Divider,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Typography
} from '@mui/material'
import { withTranslation, WithTranslation } from 'react-i18next'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import { ANIMATION } from '../../material.theme'
import { withRouter } from '../../components/with.router'
import { ApplicationState, AsyncStateStatus } from '../../store/root.types'
import { connect } from 'react-redux'
import { SosActions } from '../../store/sos'
import { ContentCopy } from '@mui/icons-material'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
})

interface IProps {
    readonly statusRequest: AsyncStateStatus
    readonly dataRequest: Array<any>

    sosRequest(): void
}

type IJoinProps = IProps & WithStyles<typeof Style> & WithTranslation

class Menu1Component extends Component<IJoinProps> {
    constructor(props: IJoinProps) {
        super(props)
    }

    /**
     * Method belonging to the component's life cycle, triggered immediately after a component is assembled (inserted in the tree).
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @return {void}
     */
    public componentDidMount() {
        const { t } = this.props
        this.props.sosRequest()
        document.title = `${t('MENU1.HELMET')}`
    }

    /**
     * Render method.
     * Triggering method to render the component.
     * @return {JSX.Element} Component to be rendered.
     */
    public render() {
        const {
            classes,
            dataRequest
        } = this.props
        return <React.Fragment>

            <Paper className={classes.fadeIn2}>
                <Box
                    ml={1}
                    mr={1}
                    display='flex'
                    justifyContent='center'
                    flexDirection='column'
                >
                    <Divider
                        style={{
                            marginBottom: '3vh'
                        }}
                    >
                        <Chip label="SOS's" size="medium" color="error"/>
                    </Divider>
                    <Box
                        m={1}
                    >
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Urgência</TableCell>
                                        <TableCell align="center">Unidade</TableCell>
                                        <TableCell align="center">Necessidades</TableCell>
                                        <TableCell align="center">Sobressalentes</TableCell>
                                        <TableCell align="center">Quantidade de Pessoas</TableCell>
                                        <TableCell align="center">Grupo de Pessoas</TableCell>
                                        <TableCell align="center">Contatos</TableCell>
                                        <TableCell align="center">Localização</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataRequest.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{row.urgencia}</TableCell>
                                            <TableCell align="center">{row.unidade}</TableCell>
                                            <TableCell align="center">
                                                <Box display={'flex'}>
                                                    {row.necessidades.map((ness) => (
                                                        <Box m={1}>
                                                            <Chip style={{ backgroundColor: '#FCDB00' }} label={ness} />
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Box display={'flex'}>
                                                    {row.sobressalentes.map((sobre) => (
                                                        <Box m={1}>
                                                            <Chip style={{ backgroundColor: '#007320', color: 'white' }} label={sobre} />
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.pessoas.quantidade}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.pessoas.grupos.map((item) => (
                                                    <Box ml={1}>
                                                        {item}
                                                    </Box>
                                                ))}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box display={'flex'}>
                                                    {row.contatos.map((ctt) => (
                                                        <Box m={1}>
                                                            <Chip style={{ marginRight: '1vh', backgroundColor: '#FCDB00' }} label={ctt} />
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                Ir para localização
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Paper>

        </React.Fragment>

    }
}

const MenuComponent: any = withTranslation()(Menu1Component)


const MenuWithTransaltion = withTranslation()(MenuComponent)

const MenuWithStyles = withStyles<any>(Style)(MenuWithTransaltion)

const Menu = withRouter((MenuWithStyles))

const mapStateToProps = (state: ApplicationState) => ({
    themeMode: state.layout.themeMode,
    statusRequest: state.sos.request.status,
    dataRequest: state.sos.request.data,
})

export default withRouter(connect(mapStateToProps, SosActions)(Menu))
