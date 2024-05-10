import {
    Theme,
    Box,
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Slide, Typography,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    TextField,
    IconButton,
    FormGroup,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    FormLabel,
    Radio,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { ContentCopy, Close, Save, AddCircle, Delete } from '@mui/icons-material'
import { Sos } from '../../application/domain/models/entity/sos'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import { WithTranslation, withTranslation } from 'react-i18next'
import React, { Component } from 'react'
import { ApplicationState, AsyncStateStatus } from '../../store/root.types'
import { ISosAction } from '../../store/sos/types'
import {
    GoogleMap,
    Marker,
    LoadScript
} from "@react-google-maps/api"
import { SosActions } from '../../store/sos'
import { connect } from 'react-redux'
import { IComponentRouter, withRouter } from '../../components/with.router'

const mobileView = matchMedia('(min-width: 768px)')

const Style = (theme: Theme) => createStyles({
    map: {
        height: mobileView.matches ? '85vh' : '75vh',
        width: '85vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapMarker: {
        marginTop: '-30px'
    }
})

interface IProps {
    readonly statusRequest: AsyncStateStatus
    readonly statusCreate: AsyncStateStatus
    readonly statusOne: AsyncStateStatus
    readonly dataRequest: Array<any>
    readonly dataCreate: Array<any>
    readonly dataOne: any

    sosRequest(): void

    sosCreateRequest(props: ISosAction): void

    sosOneRequest(props: ISosAction): void

    sosDeleteRequest(props: ISosAction): void
}

interface ISos {
    id: string,
    urgencia: string,
    unidade: string,
    necessidades: Array<string>,
    sobressalentes: Array<string>
    pessoas: {
        quantidade: number,
        grupos: Array<string>
    },
    contatos: Array<string>,
    localizacao: {
        lat: number | undefined,
        lng: number | undefined
    }
}

interface IState {
    // eslint-disable-next-line
    readonly map: google.maps.Map | any
    readonly openDialogPointer: boolean
    readonly openDialogMap: boolean
    readonly openSnackBar: boolean
    readonly newSos: ISos
    readonly newNecc: Array<any>
    readonly infoNcc: {
        readonly necessidade: string,
        readonly quantidade: number,
        readonly unidade: string
    }
    readonly newSubb: Array<any>
    readonly infoSubb: string
    readonly newCtt: Array<any>
    readonly infoCtt: string
    readonly locationType: string
    readonly locationClick: {
        readonly lat: number | undefined,
        readonly lng: number | undefined
    }
    readonly locationDevice: {
        readonly lat: number | undefined,
        readonly lng: number | undefined
    }
    readonly center: {
        readonly lat: number,
        readonly lng: number
    }
    readonly zoom: number
}

type IJoinProps = IProps & WithStyles<typeof Style> & WithTranslation & IComponentRouter

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
})

class MapComponent extends Component<IJoinProps, IState> {
    constructor(props: IJoinProps) {
        super(props)

        this.state = {
            map: null,
            openDialogPointer: false,
            openDialogMap: false,
            openSnackBar: false,
            newSos: {
                id: '',
                urgencia: '',
                unidade: '',
                necessidades: [],
                sobressalentes: [],
                pessoas: {
                    quantidade: 0,
                    grupos: []
                },
                contatos: [],
                localizacao: {
                    lat: 0,
                    lng: 0
                }
            },
            newNecc: [],
            infoNcc: {
                necessidade: '',
                quantidade: 0,
                unidade: ''
            },
            newSubb: [],
            infoSubb: '',
            newCtt: [],
            infoCtt: '',
            locationType: 'click',
            locationClick: {
                lat: 0,
                lng: 0
            },
            locationDevice: {
                lat: 0,
                lng: 0
            },
            center: {
                lat: -29.207932557235694,
                lng: -53.24161023768301,
            },
            zoom: 7
        }

        this.addInfoCtt = this.addInfoCtt.bind(this)
        this.onClickMap = this.onClickMap.bind(this)
        this.addInfoNecc = this.addInfoNecc.bind(this)
        this.addInfoSobb = this.addInfoSobb.bind(this)

        this.removeInfoCtt = this.removeInfoCtt.bind(this)
        this.removeInfoNcc = this.removeInfoNcc.bind(this)
        this.onClickPointer = this.onClickPointer.bind(this)
        this.removeInfoSubb = this.removeInfoSubb.bind(this)
        this.handleDeleteSos = this.handleDeleteSos.bind(this)
        this.handleSaveNewSos = this.handleSaveNewSos.bind(this)
        this.handleLocalizacao = this.handleLocalizacao.bind(this)
        this.onCopyToClipBoard = this.onCopyToClipBoard.bind(this)
        this.handleCkeckBoxChange = this.handleCkeckBoxChange.bind(this)

    }

    public componentDidMount() {
        const { t } = this.props
        this.props.sosRequest()
        document.title = `${t('HOME.HELMET')}`
        const query = new URLSearchParams(window.location.search)
        const markerId = query.get('marker')
        const centerLat = query.get('centerLat')
        const centerLng = query.get('centerLng')
        const zoom = query.get('zoom')
        if (markerId) {
            this.props.sosOneRequest({ id: markerId })
            if (centerLat && centerLng && zoom) {
                this.setState({
                    center: {
                        lat: parseFloat(centerLat),
                        lng: parseFloat(centerLng)
                    },
                    zoom: parseInt(zoom),
                    openDialogPointer: true
                })
            }
        }
    }

    public render() {
        const {
            dataOne,
            classes,
            dataRequest,
        } = this.props

        const {
            openDialogPointer,
            openDialogMap,
            locationType,
            newSos,
            newNecc,
            newCtt,
            newSubb,
            infoCtt,
            infoNcc,
            infoSubb,
            openSnackBar,
            center,
            zoom
        } = this.state

        // eslint-disable-next-line no-undef
        const onMapLoad = (map: google.maps.Map) => {
            this.setState({ map: map })
        }

        let color = 'info'

        if (dataOne?.urgencia === 'Urgente') color = 'error'
        if (dataOne?.urgencia === 'Pouco-urgente') color = 'warning'
        if (dataOne?.urgencia === 'Não-urgente') color = 'success'

        return (
            <React.Fragment>
                <div className={classes.map}>
                    <LoadScript
                        googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                        libraries={['places']}
                    >
                        <GoogleMap
                            onLoad={onMapLoad}
                            mapContainerStyle={{ width: "100%", height: "100%" }}
                            center={center}
                            zoom={zoom}
                            onClick={(e) => this.onClickMap(e)}
                        >
                            {dataRequest.map((pointer) => (
                                <Marker
                                    cursor={'pointer'}
                                    key={pointer.id}
                                    position={pointer.localizacao}
                                    onClick={(e) => this.onClickPointer(e, pointer.id)}
                                />
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </div>
                <Dialog
                    fullWidth
                    open={openDialogPointer}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.setState({
                        openDialogPointer: false
                    })}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>{dataOne?.unidade}</DialogTitle>
                    <DialogContent>
                        <Divider>
                            <Chip label="Informações" color="info" size="small" />
                        </Divider>
                        <Box>
                            <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Typography variant={'body2'}>
                                    Urgência:
                                </Typography>
                                {/* @ts-ignore */}
                                <Chip color={color} label={`${dataOne?.urgencia}`} />
                            </Box>
                            <Divider style={{ marginTop: '1vh' }} />
                            <Box
                                mt={1}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Typography variant={'body2'}>
                                    Necessidades:
                                </Typography>
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                >
                                    {
                                        dataOne?.necessidades?.map((ness) => (
                                            <Chip style={{ marginBottom: '1vh', backgroundColor: '#FCDB00' }} label={ness} />
                                        ))
                                    }
                                </Box>
                            </Box>
                            <Divider style={{ marginTop: '1vh' }} />
                            <Box
                                mt={1}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Typography variant={'body2'}>
                                    Sobressalente:
                                </Typography>
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                >
                                    {
                                        dataOne?.sobressalentes?.map((sobre) => (
                                            <Chip style={{ marginBottom: '1vh', backgroundColor: '#007320', color: 'white' }} label={sobre} />
                                        ))
                                    }
                                </Box>
                            </Box>
                            <Divider>
                                <Chip label="Pessoas" color="info" size="small" />
                            </Divider>
                            <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Typography variant={'body2'}>
                                    Quantidade:
                                </Typography>
                                <Chip color={'success'} label={`${dataOne?.pessoas?.quantidade}`} />
                            </Box>
                            <Divider style={{ marginTop: '1vh' }} />
                            <Box
                                mt={1}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Typography variant={'body2'}>
                                    Grupo:
                                </Typography>
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                >
                                    {
                                        dataOne?.pessoas?.grupos.map((grup) => (
                                            <Chip style={{ marginBottom: '1vh', backgroundColor: '#FCDB00' }} label={grup} />
                                        ))
                                    }
                                </Box>
                            </Box>
                            <Divider>
                                <Chip label="Contatos" color="info" size="small" />
                            </Divider>
                            <Box
                                mt={1}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Box
                                    display={'flex'}
                                    flexDirection={'row'}
                                    justifyContent={'space-around'}

                                >
                                    {
                                        dataOne?.contatos?.map((contato) => (
                                            <Chip deleteIcon={<ContentCopy />} onDelete={() => this.onCopyToClipBoard(contato)} style={{ marginRight: '1vh', backgroundColor: '#FCDB00' }} label={contato} />
                                        ))
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </DialogContent>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        m={1}
                    >
                        <Button startIcon={<Close />} color={'error'} variant={'contained'} onClick={() => this.setState({ openDialogPointer: false })}>Fechar</Button>
                        <Button startIcon={<Delete />} color={'warning'} variant={'contained'} onClick={() => this.handleDeleteSos(dataOne?.id)}>Apagar</Button>
                    </Box>
                </Dialog>
                <Dialog
                    fullWidth
                    fullScreen={mobileView.matches ? false : true}
                    open={openDialogMap}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.setState({ openDialogMap: false })}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>Adicionar Novo Ponto de SOS</DialogTitle>
                    <DialogContent>
                        <Divider>
                            <Chip label="Informações" color="info" size="small" />
                        </Divider>
                        <Box>
                            <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                m={1}
                            >
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Localização</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        defaultValue={locationType}
                                        onChange={(e) => {
                                            this.setState({ locationType: e.target.value })
                                            this.handleLocalizacao(e.target.value)
                                        }}
                                    >
                                        <FormControlLabel value="click" control={<Radio />} label="Usar Localização do Click" />
                                        <FormControlLabel value="atual" control={<Radio />} label="Usar Localização Atual" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box
                                m={1}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <TextField
                                    required
                                    fullWidth
                                    id="unidade"
                                    label="Unidade"
                                    name="unidade"
                                    autoComplete="unidade"
                                    value={newSos?.unidade}
                                    onChange={(e) => this.setState({
                                        newSos: {
                                            ...newSos,
                                            unidade: e.target.value
                                        }
                                    })}
                                />
                            </Box>
                            <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                m={1}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Nível de Urgência</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={newSos?.urgencia}
                                        label="Nível de Urgência"
                                        onChange={(event: SelectChangeEvent) => this.setState({
                                            newSos: {
                                                ...newSos,
                                                urgencia: event.target.value as string
                                            }
                                        })}
                                    >
                                        <MenuItem value={'Urgente'}>Urgente</MenuItem>
                                        <MenuItem value={'Pouco-urgente'}>Pouco-urgente</MenuItem>
                                        <MenuItem value={'Não-urgente'}>Não-urgente</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box
                                m={1}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                flexDirection={mobileView.matches ? 'row' : 'column'}
                            >
                                <Box
                                    display={'flex'}

                                >
                                    <TextField
                                        id="new_newncc"
                                        label="Necessidades"
                                        name="necessidades"
                                        autoComplete="necessidades"
                                        color={'warning'}
                                        value={infoNcc.necessidade}
                                        onChange={(e) => this.setState({
                                            infoNcc: {
                                                ...infoNcc,
                                                necessidade: e.target.value
                                            }
                                        })}
                                        style={{ flexGrow: 1, marginRight: '8px' }}
                                    />
                                    <TextField
                                        id="new_newncc"
                                        label="Quantidade"
                                        name="necessidades"
                                        autoComplete="necessidades"
                                        color={'warning'}
                                        value={infoNcc.quantidade}
                                        onChange={(e) => this.setState({
                                            infoNcc: {
                                                ...infoNcc,
                                                quantidade: parseFloat(e.target.value)
                                            }
                                        })}
                                        style={{ flexGrow: 1, marginRight: '8px' }}
                                    />
                                    <TextField
                                        id="new_newncc"
                                        label="Unidade"
                                        name="necessidades"
                                        autoComplete="necessidades"
                                        color={'warning'}
                                        value={infoNcc.unidade}
                                        onChange={(e) => this.setState({
                                            infoNcc: {
                                                ...infoNcc,
                                                unidade: e.target.value
                                            }
                                        })}
                                        style={{ flexGrow: 1 }}
                                    />
                                </Box>
                                <IconButton onClick={this.addInfoNecc}>
                                    <AddCircle sx={{ fontSize: 40, color: '#ED6C03' }} />
                                </IconButton>
                            </Box>
                            <Box
                                m={1}
                                display={'flex'}
                                alignItems={'center'}
                            >
                                {newNecc.map((info, index) => (
                                    <Chip
                                        label={info}
                                        color={'warning'}
                                        style={{ marginRight: '1vh', color: 'white' }}
                                        deleteIcon={<Delete style={{ color: 'white' }} />} onDelete={(e) => this.removeInfoNcc(index)}
                                    />
                                ))}
                            </Box>
                            <Box
                                m={1}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <TextField
                                    required
                                    fullWidth
                                    id="new_sobb"
                                    label="Sobressalentes"
                                    name="sobressalentes"
                                    autoComplete="sobressalentes"
                                    value={infoSubb}
                                    onChange={(e) => this.setState({
                                        infoSubb: e.target.value
                                    })}
                                />
                                <IconButton onClick={this.addInfoSobb}>
                                    <AddCircle sx={{ fontSize: 40, color: '#007320' }} />
                                </IconButton>
                            </Box>
                            <Box
                                m={1}
                                display={'flex'}
                                alignItems={'center'}
                            >
                                {newSubb.map((info, index) => (
                                    <Chip
                                        label={info}
                                        style={{ marginRight: '1vh', color: 'white', backgroundColor: '#007320' }}
                                        deleteIcon={<Delete style={{ color: 'white' }} />} onDelete={(e) => this.removeInfoSubb(index)}
                                    />
                                ))}
                            </Box>
                            <Divider>
                                <Chip label="Pessoas" color="info" size="small" />
                            </Divider>
                            <Box
                                m={1}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <TextField
                                    required
                                    fullWidth
                                    id="quantidade"
                                    label="Quantidades"
                                    name="qunatidades"
                                    autoComplete="quantidades"
                                    type={'number'}
                                    value={newSos?.pessoas?.quantidade}
                                    onChange={(e) => this.setState({
                                        newSos: {
                                            ...newSos,
                                            pessoas: {
                                                ...newSos.pessoas,
                                                quantidade: parseInt(e.target.value)
                                            }
                                        }
                                    })}
                                />
                            </Box>
                            <Box
                                m={1}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Typography variant={'body2'}>
                                    Grupo:
                                </Typography>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox onChange={this.handleCkeckBoxChange} value="Idosos > 60 anos" />}
                                        label="Idosos > 60 anos"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox onChange={this.handleCkeckBoxChange} value="Adultos > 21 anos" />}
                                        label="Adultos > 21 anos"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox onChange={this.handleCkeckBoxChange} value="Jovens > 15 anos" />}
                                        label="Jovens > 15 anos"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox onChange={this.handleCkeckBoxChange} value="Crianças < 14 anos" />}
                                        label="Crianças < 14 anos"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox onChange={this.handleCkeckBoxChange} value="Recem-nascidos ou menores de 1 ano" />}
                                        label="Recem-nascidos ou menores de 1 ano"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox onChange={this.handleCkeckBoxChange} value="Animais" />}
                                        label="Animais"
                                    />
                                </FormGroup>
                            </Box>
                            <Divider>
                                <Chip label="Contatos" color="info" size="small" />
                            </Divider>
                            <Box
                                m={1}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <TextField
                                    required
                                    fullWidth
                                    id="new_ctt"
                                    label="Contatos"
                                    name="contatos"
                                    autoComplete="contatos"
                                    color={'info'}
                                    value={infoCtt}
                                    onChange={(e) => this.setState({
                                        infoCtt: e.target.value
                                    })}
                                />
                                <IconButton onClick={this.addInfoCtt}>
                                    <AddCircle sx={{ fontSize: 40, color: '#0079C5' }} />
                                </IconButton>
                            </Box>
                            <Box
                                m={1}
                                display={'flex'}
                                alignItems={'center'}
                            >
                                {newCtt.map((info, index) => (
                                    <Chip
                                        label={info}
                                        style={{ marginRight: '1vh', color: 'white', backgroundColor: '#0079C5' }}
                                        deleteIcon={<Delete style={{ color: 'white' }} />} onDelete={(e) => this.removeInfoCtt(index)}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button startIcon={<Save />} color={'success'} variant={'contained'} onClick={this.handleSaveNewSos}>Salvar</Button>
                        <Button startIcon={<Close />} color={'error'} variant={'contained'} onClick={() => this.setState({ openDialogMap: false })}>Fechar</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    message="Copiado para área de transferencia"
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={2000}
                    onClose={() => this.setState({ openSnackBar: false })}
                    open={openSnackBar}
                />
            </React.Fragment>
        )

    }

    // eslint-disable-next-line no-undef
    private onClickPointer(e: google.maps.MapMouseEvent, sosId: string) {
        this.props.navigate(`?marker=${sosId}`)
        this.props.sosOneRequest({ id: sosId })
        this.setState({
            openDialogPointer: true
        })
    }

    // eslint-disable-next-line no-undef
    private onClickMap(e: google.maps.MapMouseEvent) {
        this.setState({
            openDialogMap: true,
            locationClick: {
                lat: e.latLng?.lat(),
                lng: e.latLng?.lng()
            }
        })
    }

    private onCopyToClipBoard(contact: string) {
        this.setState({
            openSnackBar: true
        })
        navigator.clipboard.writeText(contact)
    }

    private addInfoNecc() {
        const {
            infoNcc,
            newNecc,
            newSos
        } = this.state;
    
        const { necessidade, quantidade, unidade } = infoNcc
    
        if (necessidade.trim() !== '' && quantidade && unidade) {
            const novaNecessidade = `${necessidade} - ${quantidade} ${unidade}`
            
            this.setState({
                newNecc: [...newNecc, novaNecessidade],
                newSos: {
                    ...newSos,
                    necessidades: [...newSos.necessidades, novaNecessidade]
                },
                infoNcc: {
                    necessidade: '',
                    quantidade: 0,
                    unidade: ''
                }
            });
        }
    }
    

    private removeInfoNcc(index: number) {
        const newInfos = [this.state.newNecc]
        newInfos.splice(index, 1)
        this.setState({
            newNecc: newInfos
        })
    }

    private addInfoSobb() {
        const {
            infoSubb,
            newSubb,
            newSos
        } = this.state
        if (infoSubb.trim() !== '') {
            this.setState({
                newSubb: [...newSubb, infoSubb],
                newSos: {
                    ...newSos,
                    sobressalentes: [...newSos.sobressalentes, infoSubb]
                },
                infoSubb: ''
            })
        }
    }

    private removeInfoSubb(index: number) {
        const newInfos = [this.state.newSubb]
        newInfos.splice(index, 1)
        this.setState({
            newSubb: newInfos
        })
    }

    private addInfoCtt() {
        const {
            infoCtt,
            newCtt,
            newSos
        } = this.state
        if (infoCtt.trim() !== '') {
            this.setState({
                newCtt: [...newCtt, infoCtt],
                newSos: {
                    ...newSos,
                    contatos: [...newSos.contatos, infoCtt]
                },
                infoCtt: ''
            })
        }
    }

    private removeInfoCtt(index: number) {
        const newInfos = [this.state.newCtt]
        newInfos.splice(index, 1)
        this.setState({
            newCtt: newInfos
        })
    }

    private handleCkeckBoxChange(event) {
        const { value, checked } = event.target
        const { newSos } = this.state
        if (checked) {
            this.setState({
                newSos: {
                    ...newSos,
                    pessoas: {
                        ...newSos.pessoas,
                        grupos: [...newSos.pessoas.grupos, value]
                    }
                }
            })
        } else {
            this.setState({
                newSos: {
                    ...newSos,
                    pessoas: {
                        ...newSos.pessoas,
                        grupos: newSos.pessoas.grupos.filter(item => item !== value)
                    }
                }
            })
        }
    }

    private handleSaveNewSos() {
        let loc: { lat: number | undefined; lng: number | undefined } = {
            lat: 0,
            lng: 0
        }
        if (this.state.locationType === 'click') loc = this.state.locationClick
        if (this.state.locationType === 'atual') loc = this.state.locationDevice
        this.props.sosCreateRequest({
            payload: new Sos().fromJSON({
                ...this.state.newSos,
                localizacao: loc
            })
        })
        this.setState({
            newSos: {
                id: '',
                urgencia: '',
                unidade: '',
                necessidades: [],
                sobressalentes: [],
                pessoas: {
                    quantidade: 0,
                    grupos: []
                },
                contatos: [],
                localizacao: {
                    lat: 0,
                    lng: 0
                }
            },
            newCtt: [],
            newNecc: [],
            newSubb: [],
            openDialogMap: false
        })
    }

    private handleDeleteSos(sosId: string) {
        this.props.sosDeleteRequest({ id: sosId })
        this.setState({
            openDialogPointer: false
        })
    }

    private handleLocalizacao(type: string) {
        if (type === 'atual') {
            navigator.geolocation.getCurrentPosition(location => {
                this.setState({
                    locationDevice: {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                    }
                })
                console.log(this.state.locationDevice)
            })
        }
    }
}

const MapWithTransaltion = withTranslation()(MapComponent)

const MapWithStyles = withStyles<any>(Style)(MapWithTransaltion)

const Map = withRouter((MapWithStyles))

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

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Map))
