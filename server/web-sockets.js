// Send a message out to all connected sockets
exports.broadcastMessage = (io, message) => {
	io.sockets.emit('broadcast', {
		message,
		type: 'new_message'
	});
};

// Primary listener for responding to events from connected sockets
exports.listen = (io) => {
	io.on('connection', (socket) => {
		// Handle client disconnection
		socket.on('disconnect', () => {
			const allConnectedSockets = io.sockets.clients().sockets;
			const disconnectingSocketSession = socket.handshake.session;

			// Checking if other connections by the disconnecting user have been made
			const hasAnotherUserConnection = Object.keys(allConnectedSockets).reduce((accumulator, currentKey) => {
				// If one has been found return true
				if (accumulator) return true;
				// Otherwise compare other connections to the currently disconnecting user
				const otherSocketSession = allConnectedSockets[currentKey].handshake.session;
				return disconnectingSocketSession.passport.user.id === otherSocketSession.passport.user.id;
			}, false);

			if (!hasAnotherUserConnection) {
				socket.broadcast.emit('user_disconnected', disconnectingSocketSession.passport.user);
			}
		});

		// Provide a client with a list of all currently connected users
		socket.on('get_connected_users', () => {
			const allConnectedSockets = io.sockets.clients().sockets;
			const allConnectedUsers = {};

			Object.keys(allConnectedSockets).forEach((currentKey) => {
				const otherSocketSession = allConnectedSockets[currentKey].handshake.session;
				allConnectedUsers[otherSocketSession.passport.user.id] = otherSocketSession.passport.user;
			});

			socket.emit('get_connected_users', allConnectedUsers);
		});

		socket.on('user_connected', (user) => {
			socket.broadcast.emit('user_connected', user);
		});
	});
};
