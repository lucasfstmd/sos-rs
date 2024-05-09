import React from "react";
import {
    GoogleMap,
    Marker,
    LoadScript
} from "@react-google-maps/api"
import "./index.css"
import {
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
    Skeleton
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { ContentCopy, Close, Save, AddCircle, Delete } from '@mui/icons-material'
import { AsyncStateStatus } from '../../store/root.types'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface IUnidade {
    id: number,
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

const MapPage = (props) => {
    // eslint-disable-next-line no-undef
    const [map, setMap] = React.useState<google.maps.Map>()
    const [openDialogPointer, setOpenDialogPointer] = React.useState(false)
    const [openDialogMap, setOpenDialogMap] = React.useState(false)
    const [openDialogEditar, setOpenDialogEditar] = React.useState(false)
    const [openSnackBar, setOpenSnackBar] = React.useState(false)
    const [newUnidade, setNewUnidade] = React.useState<IUnidade>({
        id: 0,
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
    })
    const [newNecc, setNewNecc] = React.useState<any>([])
    const [novaNecc, setNovaNcc] = React.useState<string>('');
    const [newSobb, setNewSobb] = React.useState<any>([])
    const [novaSobb, setNovaSobb] = React.useState<string>('')
    const [newCtt, setNewCtt] = React.useState<any>([])
    const [novaCtt, setNovaCtt] = React.useState<string>('')
    const [unid, setUnid] = React.useState<IUnidade>({
            id: 0,
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
        })

    const position = {
        lat: -29.207932557235694,
        lng: -53.24161023768301,
    };
    // eslint-disable-next-line no-undef
    const onMapLoad = (map: google.maps.Map) => {
        setMap(map);
    };
    // eslint-disable-next-line no-undef
    const onClickPointer = (e: google.maps.MapMouseEvent, unidId: number) => {
        props.onGetOne(unidId)
        setOpenDialogPointer(true)
    };


    // eslint-disable-next-line no-undef
    const onClickMap = (e: google.maps.MapMouseEvent) => {
        setOpenDialogMap(true)
        setNewUnidade({
            ...newUnidade,
            localizacao: {
                lat: e.latLng?.lat(),
                lng: e.latLng?.lng()
            }
        })
    };

    const onCopyToClikBoard = (contato: string) => {
        setOpenSnackBar(true)
        navigator.clipboard.writeText(contato)
    }

    const addInfoNecc = () => {
        if (novaNecc.trim() !== '') {
            setNewNecc([...newNecc, novaNecc])
            setNewUnidade({
                ...newUnidade,
                necessidades: [...newUnidade.necessidades, novaNecc]
            })
            setNovaNcc('')
        }
    }

    const removerInfo = (index) => {
        const novasInformacoes = [...newNecc]
        novasInformacoes.splice(index, 1)
        setNewNecc(novasInformacoes)
    }

    const addInfoSobre = () => {
        if (novaSobb.trim() !== '') {
            setNewSobb([...newSobb, novaSobb])
            setNewUnidade({
                ...newUnidade,
                sobressalentes: [...newUnidade.sobressalentes, novaSobb]
            })
            setNovaSobb('')
        }
    }

    const removerInfoSobre = (index) => {
        const novasInformacoes = [...newSobb]
        novasInformacoes.splice(index, 1)
        setNewSobb(novasInformacoes)
    }

    const addInfoCtt = () => {
        if (novaCtt.trim() !== '') {
            setNewCtt([...newCtt, novaCtt])
            setNewUnidade({
                ...newUnidade,
                contatos: [...newUnidade.contatos, novaCtt]
            })
            setNovaCtt('')
        }
    }

    const removerInfoCtt = (index) => {
        const novasInformacoes = [...newCtt]
        novasInformacoes.splice(index, 1)
        setNewCtt(novasInformacoes)
    }

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setNewUnidade({
                ...newUnidade,
                pessoas: {
                    ...newUnidade.pessoas,
                    grupos: [...newUnidade.pessoas.grupos, value]
                }
            });
        } else {
            setNewUnidade({
                ...newUnidade,
                pessoas: {
                    ...newUnidade.pessoas,
                    grupos: newUnidade.pessoas.grupos.filter(item => item !== value)
                }
            })
        }
    }

    const handleSaveNewPointer = () => {
        props.onCreate(newUnidade)
        setOpenDialogMap(false)
    }

    const handleEditarPointer = () => {
        props.onEditar(newUnidade)
        setOpenDialogMap(false)
    }

    const handleDeletePointer = (unidId: number) => {
        props.onDelete(unidId)
        setOpenDialogPointer(false)

    }

    let color = 'info'

    if (props.dataOne?.urgencia === 'Urgente') color = 'error'
    if (props.dataOne?.urgencia === 'Pouco-urgente') color = 'warning'
    if (props.dataOne?.urgencia === 'Não-urgente') color = 'success'

    // @ts-ignore
    return (
        <React.Fragment>
            <div className="map">
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                    libraries={["places"]}
                >
                    <GoogleMap
                        onLoad={onMapLoad}
                        mapContainerStyle={{ width: "95%", height: "90%" }}
                        center={position}
                        zoom={7}
                        onClick={(e) => onClickMap(e)}
                    >
                        {props.poiters.map((pointer) => (
                            <Marker
                                cursor={'pointer'}
                                key={pointer.id}
                                position={pointer.localizacao}
                                onClick={(e) => onClickPointer(e, pointer.id)}
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
                onClose={() => setOpenDialogPointer(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                {
                    props.statusOne === AsyncStateStatus.LOADING ?
                        <>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="rectangular" width={210} height={60} />
                            <Skeleton variant="rounded" width={210} height={60} />
                        </>
                        :
                        <>
                            <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>{props.dataOne?.unidade}</DialogTitle>
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
                                        <Chip color={color} label={`${props.dataOne?.urgencia}`} />
                                    </Box>
                                    <Divider style={{ marginTop: '1vh' }}/>
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
                                                props.dataOne?.necessidades?.map((ness) => (
                                                    <Chip style={{ marginBottom: '1vh', backgroundColor: '#FCDB00' }} label={ness} />
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                    <Divider style={{ marginTop: '1vh' }}/>
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
                                                props.dataOne?.sobressalentes?.map((sobre) => (
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
                                        {/* @ts-ignore */}
                                        <Chip color={'success'} label={`${props.dataOne?.pessoas?.quantidade}`} />
                                    </Box>
                                    <Divider style={{ marginTop: '1vh' }}/>
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
                                                props.dataOne?.pessoas?.grupos.map((grup) => (
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
                                                props.dataOne?.contatos?.map((contato) => (
                                                    <Chip deleteIcon={<ContentCopy/>} onDelete={() => onCopyToClikBoard(contato)} style={{ marginRight: '1vh', backgroundColor: '#FCDB00' }} label={contato} />
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
                                <Button startIcon={<Close/>} color={'error'} variant={'contained'} onClick={() => setOpenDialogPointer(false)}>Fechar</Button>
                                <Button startIcon={<Delete/>} color={'warning'} variant={'contained'} onClick={() => handleDeletePointer(props.dataOne?.id)}>Apagar</Button>
                            </Box>
                        </>
                }
            </Dialog>
            <Dialog
                fullWidth
                open={openDialogMap}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpenDialogMap(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>Adicionar Novo Ponto de SOS</DialogTitle>
                <DialogContent>
                    <Divider>
                        <Chip label="Informações" color="info" size="small" />
                    </Divider>
                    <Box>
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
                                value={newUnidade?.unidade}
                                onChange={(e) => setNewUnidade({
                                    ...newUnidade,
                                    unidade: e.target.value
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
                                    value={newUnidade?.urgencia}
                                    label="Nível de Urgência"
                                    onChange={(event: SelectChangeEvent) => setNewUnidade({
                                        ...newUnidade,
                                        urgencia: event.target.value as string
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
                        >
                            <TextField
                                required
                                fullWidth
                                id="new_newncc"
                                label="Necessidades"
                                name="necessidades"
                                autoComplete="necessidades"
                                color={'warning'}
                                value={novaNecc}
                                onChange={(e) => setNovaNcc(e.target.value)}
                            />
                            <IconButton onClick={addInfoNecc}>
                                <AddCircle sx={{ fontSize: 40, color: '#ED6C03' }}/>
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
                                    deleteIcon={<Delete style={{ color: 'white' }}/>} onDelete={(e) => removerInfo(index)}
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
                                value={novaSobb}
                                onChange={(e) => setNovaSobb(e.target.value)}
                            />
                            <IconButton onClick={addInfoSobre}>
                                <AddCircle sx={{ fontSize: 40, color: '#007320' }}/>
                            </IconButton>
                        </Box>
                        <Box
                            m={1}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            {newSobb.map((info, index) => (
                                <Chip
                                    label={info}
                                    style={{ marginRight: '1vh', color: 'white', backgroundColor: '#007320' }}
                                    deleteIcon={<Delete style={{ color: 'white' }}/>} onDelete={(e) => removerInfoSobre(index)}
                                />
                            ))}
                        </Box>
                        <Divider>
                            <Chip label="Pessoas" color="info" size="small"/>
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
                                value={newUnidade?.pessoas?.quantidade}
                                onChange={(e) => setNewUnidade({
                                    ...newUnidade,
                                    pessoas: {
                                        ...newUnidade.pessoas,
                                        quantidade: parseInt(e.target.value)
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
                                    control={<Checkbox onChange={handleCheckboxChange} value="Idosos > 60 anos" />}
                                    label="Idosos > 60 anos"
                                />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleCheckboxChange} value="Adultos > 21 anos" />}
                                    label="Adultos > 21 anos"
                                />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleCheckboxChange} value="Jovens > 15 anos" />}
                                    label="Jovens > 15 anos"
                                />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleCheckboxChange} value="Crianças < 14 anos" />}
                                    label="Crianças < 14 anos"
                                />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleCheckboxChange} value="Recem-nascidos ou menores de 1 ano" />}
                                    label="Recem-nascidos ou menores de 1 ano"
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
                                value={novaCtt}
                                onChange={(e) => setNovaCtt(e.target.value)}
                            />
                            <IconButton onClick={addInfoCtt}>
                                <AddCircle sx={{ fontSize: 40, color: '#0079C5' }}/>
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
                                    deleteIcon={<Delete style={{ color: 'white' }}/>} onDelete={(e) => removerInfoCtt(index)}
                                />
                            ))}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button startIcon={<Save/>} color={'success'} variant={'contained'} onClick={handleSaveNewPointer}>Salvar</Button>
                    <Button startIcon={<Close/>} color={'error'} variant={'contained'} onClick={() => setOpenDialogMap(false)}>Fechar</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth
                open={openDialogEditar}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpenDialogEditar(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>Editar Ponto - {unid.unidade}</DialogTitle>
                <DialogContent>
                    <Divider>
                        <Chip label="Informações" color="info" size="small" />
                    </Divider>
                    <Box>
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
                                defaultValue={unid.unidade}
                                onChange={(e) => setUnid({
                                    ...newUnidade,
                                    unidade: e.target.value
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
                                    value={unid?.unidade}
                                    label="Nível de Urgência"
                                    onChange={(event: SelectChangeEvent) => setUnid({
                                        ...newUnidade,
                                        urgencia: event.target.value as string
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
                        >
                            <TextField
                                required
                                fullWidth
                                id="new_newncc"
                                label="Necessidades"
                                name="necessidades"
                                autoComplete="necessidades"
                                color={'warning'}
                                defaultValue={novaNecc}
                                onChange={(e) => setNovaNcc(e.target.value)}
                            />
                            <IconButton onClick={addInfoNecc}>
                                <AddCircle sx={{ fontSize: 40, color: '#ED6C03' }}/>
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
                                    deleteIcon={<Delete style={{ color: 'white' }}/>} onDelete={(e) => removerInfo(index)}
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
                                value={novaSobb}
                                onChange={(e) => setNovaSobb(e.target.value)}
                            />
                            <IconButton onClick={addInfoSobre}>
                                <AddCircle sx={{ fontSize: 40, color: '#007320' }}/>
                            </IconButton>
                        </Box>
                        <Box
                            m={1}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            {newSobb.map((info, index) => (
                                <Chip
                                    label={info}
                                    style={{ marginRight: '1vh', color: 'white', backgroundColor: '#007320' }}
                                    deleteIcon={<Delete style={{ color: 'white' }}/>} onDelete={(e) => removerInfoSobre(index)}
                                />
                            ))}
                        </Box>
                        <Divider>
                            <Chip label="Pessoas" color="info" size="small"/>
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
                                defaultValue={newUnidade?.pessoas?.quantidade}
                                onChange={(e) => setNewUnidade({
                                    ...newUnidade,
                                    pessoas: {
                                        ...newUnidade.pessoas,
                                        quantidade: parseInt(e.target.value)
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
                            <FormGroup
                                defaultValue={newUnidade?.pessoas?.grupos}
                            >
                                <FormControlLabel
                                    control={<Checkbox onChange={handleCheckboxChange} value="Idosos > 60 anos" />}
                                    label="Idosos > 60 anos"
                                />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleCheckboxChange} value="Adultos > 21 anos" />}
                                    label="Adultos > 21 anos"
                                />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleCheckboxChange} value="Jovens > 15 anos" />}
                                    label="Jovens > 15 anos"
                                />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleCheckboxChange} value="Crianças < 14 anos" />}
                                    label="Crianças < 14 anos"
                                />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleCheckboxChange} value="Recem-nascidos ou menores de 1 ano" />}
                                    label="Recem-nascidos ou menores de 1 ano"
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
                                defaultValue={novaCtt}
                                onChange={(e) => setNovaCtt(e.target.value)}
                            />
                            <IconButton onClick={addInfoCtt}>
                                <AddCircle sx={{ fontSize: 40, color: '#0079C5' }}/>
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
                                    deleteIcon={<Delete style={{ color: 'white' }}/>} onDelete={(e) => removerInfoCtt(index)}
                                />
                            ))}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button startIcon={<Save/>} color={'success'} variant={'contained'} onClick={handleEditarPointer}>Salvar</Button>
                    <Button startIcon={<Close/>} color={'error'} variant={'contained'} onClick={() => setOpenDialogEditar(false)}>Fechar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                message="Copiado para área de transferencia"
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={2000}
                onClose={() => setOpenSnackBar(false)}
                open={openSnackBar}
            />
        </React.Fragment>
    );
};

export default MapPage;
