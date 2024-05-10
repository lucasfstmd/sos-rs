import React, { Component } from 'react'
import {
    Box,
    Chip,
    Divider,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    Theme
} from '@mui/material'
import { withTranslation, WithTranslation } from 'react-i18next'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import { ANIMATION } from '../../material.theme'
import { withRouter } from '../../components/with.router'
import { ApplicationState, AsyncStateStatus } from '../../store/root.types'
import { connect } from 'react-redux'
import { SosActions } from '../../store/sos'
import { Link } from 'react-router-dom'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
})

interface IProps {
    readonly statusRequest: AsyncStateStatus
    readonly dataRequest: Array<any>

    sosRequest(): void
}

type IJoinProps = IProps & WithStyles<typeof Style> & WithTranslation

interface IState {
    readonly page: number
    readonly rowsPerPage: number
}

class ListComponent extends Component<IJoinProps, IState> {

    // eslint-disable-next-line
    constructor(props: IJoinProps) {
        super(props)

        this.state = {
            page: 0,
            rowsPerPage: 5
        }

        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
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

        const {
            page,
            rowsPerPage,
        } = this.state

        const startIndex = page * rowsPerPage
        const endIndex = startIndex + rowsPerPage
        const currentData = dataRequest.slice(startIndex, endIndex)

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
                                    {currentData.map((row) => (
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
                                                <Link to={`/app/map?marker=${row.id}&centerLat=${row.localizacao.lat}&centerLng=${row.localizacao.lng}&zoom=${15}`}>
                                                    Ir para localização
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Box>
                                <Divider/>
                                <TablePagination
                                    component="div"
                                    count={dataRequest.length}
                                    page={page}
                                    onPageChange={this.handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                />
                            </Box>
                        </TableContainer>
                    </Box>
                </Box>
            </Paper>
        </React.Fragment>
    }

    private handleChangePage(
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) {
        this.setState({ page: newPage })
    }

    private handleChangeRowsPerPage(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        })
    }
}

const ListWithTranslation: any = withTranslation()(ListComponent)


const ListWithTransaltion = withTranslation()(ListWithTranslation)

const ListWithStyles = withStyles<any>(Style)(ListWithTransaltion)

const List = withRouter((ListWithStyles))

const mapStateToProps = (state: ApplicationState) => ({
    themeMode: state.layout.themeMode,
    statusRequest: state.sos.request.status,
    dataRequest: state.sos.request.data,
})

export default withRouter(connect(mapStateToProps, SosActions)(List))
