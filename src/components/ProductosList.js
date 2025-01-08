import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/ProductosList.css';

const ProductosList = () => {
    const [productos, setProductos] = useState([]); // Lista de productos
    const [productosFiltrados, setProductosFiltrados] = useState([]); // productos filtrados
    const [busqueda, setBusqueda] = useState(''); // Valor del campo de búsqueda
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productoEditable, setProductoEditable] = useState(null); // Producto en edición
    const [productoNuevo, setProductoNuevo] = useState(null); // Producto en modo de creación

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await api.get('/productos');
                setProductos(response.data);
                setProductosFiltrados(response.data); // Inicializa los productos
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const handleSearch = () => {
        const filtrados = productos.filter(
            (producto) =>
                producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                producto.id.toString().includes(busqueda)
        );
        setProductosFiltrados(filtrados);
    };

    const resetBusqueda = () => {
        setBusqueda('');
        setProductosFiltrados(productos); // Restaurar la lista
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                await api.delete(`/productos/${id}`);
                setProductos(productos.filter((producto) => producto.id !== id));
                setProductosFiltrados(productosFiltrados.filter((producto) => producto.id !== id));
                alert('Producto eliminado correctamente.');
            } catch (err) {
                console.error('Error al eliminar producto:', err);
                alert('Error al eliminar el producto.');
            }
        }
    };

    const handleEditar = (producto) => {
        setProductoEditable(producto); // Establecer el producto en edición
    };

    const handleGuardar = async () => {
        try {
            if (productoEditable) {
                // Actualizar producto existente
                await api.put(`/productos/${productoEditable.id}`, productoEditable);
                alert('Producto actualizado correctamente.');
                setProductos((prevProductos) =>
                    prevProductos.map((producto) =>
                        producto.id === productoEditable.id ? productoEditable : producto
                    )
                );
                setProductosFiltrados((prevProductosFiltrados) =>
                    prevProductosFiltrados.map((producto) =>
                        producto.id === productoEditable.id ? productoEditable : producto
                    )
                );
                setProductoEditable(null);
            } else if (productoNuevo) {
                // Crear nuevo producto
                const response = await api.post('/productos', productoNuevo);
                alert('Producto creado correctamente.');
                setProductos([...productos, response.data]);
                setProductosFiltrados([...productosFiltrados, response.data]);
                setProductoNuevo(null); // Limpiar el producto nuevo
            }
        } catch (err) {
            console.error('Error al guardar producto:', err.response || err.message);
            alert(`Error al guardar el producto: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleCancelar = () => {
        setProductoEditable(null); // Salir del modo de edición
        setProductoNuevo(null); // Cancelar el modo "Agregar nuevo"
    };

    const handleAgregarNuevo = () => {
        setProductoNuevo({
            nombre: '',
            descripcion: '',
            categoria: '',
            precio: '',
            subpartida: '',
        }); // Crear un nuevo producto vacío
    };

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar productos: {error.message}</p>;

    return (
        <div className="productos-container">
            <h1>Gestión de Productos</h1>

            {/* Barra de búsqueda */}
            <div className="search-bar">
                <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por ID o Nombre..."
                />
                <button onClick={handleSearch}>Buscar</button>
                <button onClick={resetBusqueda} className="reset-button">
                    Limpiar
                </button>
                <button onClick={handleAgregarNuevo} className="add-button">
                    Agregar Nuevo
                </button>
            </div>

            {/* Tabla de productos */}
            <table className="productos-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Categoría</th> 
                        <th>Precio</th>
                        <th>Subpartida</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Fila para el nuevo producto */}
                    {productoNuevo && (
                        <tr>
                            <td>Nuevo</td>
                            <td>
                                <input
                                    type="text"
                                    value={productoNuevo.nombre}
                                    onChange={(e) =>
                                        setProductoNuevo({
                                            ...productoNuevo,
                                            nombre: e.target.value,
                                        })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={productoNuevo.descripcion}
                                    onChange={(e) =>
                                        setProductoNuevo({
                                            ...productoNuevo,
                                            descripcion: e.target.value,
                                        })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={productoNuevo.categoria}
                                    onChange={(e) =>
                                        setProductoNuevo({
                                            ...productoNuevo,
                                            categoria: e.target.value,
                                        })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={productoNuevo.precio}
                                    onChange={(e) =>
                                        setProductoNuevo({
                                            ...productoNuevo,
                                            precio: e.target.value,
                                        })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={productoNuevo.subpartida}
                                    onChange={(e) =>
                                        setProductoNuevo({
                                            ...productoNuevo,
                                            subpartida: e.target.value,
                                        })
                                    }
                                />
                            </td>
                            <td>
                                <button onClick={handleGuardar} className="save-button">
                                    Guardar
                                </button>
                                <button onClick={handleCancelar} className="cancel-button">
                                    Cancelar
                                </button>
                            </td>
                        </tr>
                    )}

                    {/* Fila para productos existentes */}
                    {productosFiltrados.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>
                                {productoEditable?.id === producto.id ? (
                                    <input
                                        type="text"
                                        value={productoEditable.nombre}
                                        onChange={(e) =>
                                            setProductoEditable({
                                                ...productoEditable,
                                                nombre: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    producto.nombre
                                )}
                            </td>
                            <td>
                                {productoEditable?.id === producto.id ? (
                                    <input
                                        type="text"
                                        value={productoEditable.descripcion}
                                        onChange={(e) =>
                                            setProductoEditable({
                                                ...productoEditable,
                                                descripcion: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    producto.descripcion
                                )}
                            </td>
                            <td>
                                {productoEditable?.id === producto.id ? (
                                    <input
                                        type="text"
                                        value={productoEditable.categoria}
                                        onChange={(e) =>
                                            setProductoEditable({
                                                ...productoEditable,
                                                categoria: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    producto.categoria
                                )}
                            </td>
                            <td>
                                {productoEditable?.id === producto.id ? (
                                    <input
                                        type="number"
                                        value={productoEditable.precio}
                                        onChange={(e) =>
                                            setProductoEditable({
                                                ...productoEditable,
                                                precio: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    producto.precio
                                )}
                            </td>
                            <td>
                                {productoEditable?.id === producto.id ? (
                                    <input
                                        type="text"
                                        value={productoEditable.subpartida}
                                        onChange={(e) =>
                                            setProductoEditable({
                                                ...productoEditable,
                                                subpartida: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    producto.subpartida
                                )}
                            </td>
                            <td>
                                {productoEditable?.id === producto.id ? (
                                    <>
                                        <button onClick={handleGuardar} className="save-button">
                                            Guardar
                                        </button>
                                        <button onClick={handleCancelar} className="cancel-button">
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditar(producto)}
                                            className="edit-button"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(producto.id)}
                                            className="delete-button"
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductosList;
